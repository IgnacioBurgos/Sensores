require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  apiKey:  process.env.API_KEY,
  jwtSecret: process.env.SECRET_JWT,
  userNameGmail: process.env.SMTP_EMAIL,
  passwordGmail: process.env.SMTP_PASSWORD,
}

module.exports = { config };
