const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token,
    }
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const recoveryToken = token.replace(/[.]/g,'*');
    const link = `http://localhost:8080/new-password/${recoveryToken}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, password) {
    try{
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(password, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password modificado'}
    }catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.userNameGmail,
        pass: config.passwordGmail
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail enviado'};
  }
}

// autentifica al usuario segun el token de jwt
async function verificarToken(req, res, next) {
  let token = req.headers["authorization"];
  token = token.split(" ")[1]; //Access token

  jwt.verify(token, "access", async (err, user) => {
      if (user) {
          req.user = user;
          next();
      } else if (err.message === "jwt expired") {
          return res.json({
              success: false,
              message: "Access token expired"
          });
      } else {
          return res
              .status(403)
              .json({ err, message: "User not authenticated" });
      }
  });
}

module.exports = AuthService;
