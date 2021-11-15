const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
let refreshTokens = [];

const AuthService = require('./../services/auth.service');


const router = express.Router();
const service = new AuthService();



// Ruta de login (Se crea un token de acceso);
router.post("/login", (req, res) => {
  const user = req.body.user;
  if (!user) {
      return res.status(404).json({ message: "Body empty" });
  }
  passport.authenticate('local', {session: false});
  res.json(service.signToken(user));
  let accessToken = jwt.sign(user, "access", { expiresIn: "2s" });
  let refreshToken = jwt.sign(user, "refresh", { expiresIn: "7d" });
  refreshTokens.push(refreshToken);

  return res.status(201).json({
      accessToken,
      refreshToken
  });
});

router.post('/change-password',
  // capa de validacion -- falta crear
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword( token, newPassword );
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Crea un nuevo token de acceso segun el token que se refreca cada 20s
router.post("/refresh", (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.json({ message: "Refresh token not found, login again" });
  }

  // If the refresh token is valid, create a new accessToken and return it.
  jwt.verify(refreshToken, "refresh", (err, user) => {
      if (!err) {
          const accessToken = jwt.sign({ username: user.name }, "access", {
              expiresIn: "20s"
          });
          return res.json({ success: true, accessToken });
      } else {
          return res.json({
              success: false,
              message: "Invalid refresh token"
          });
      }
  });
});

// Rutas protegidas para usuarios logeados
router.post("/protected",service.verificarToken, (req, res) => {
  return res.json({ message: "Protected content!" });
});

module.exports = router;
