require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_DATABASE_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_DATABASE_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_DATABASE_PROD,
    "host": process.env.DB_HOST_PROD,
    "dialect": "mysql"
  }
}