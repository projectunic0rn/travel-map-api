require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "XSTAR1232",
    database: "Geornal",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "mysql"
  }
};
