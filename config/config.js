require("dotenv").config();
module.exports = {
  development: {
    username: "qaufcmuvvrzunc",
    password:
      "22ca2cb5e864a6e9f3da9cd33b34f79a430223425f3a44dcec96fb3da780f520",
    database: "deb2u8aa2ep3cj",
    host: "ec2-23-21-160-38.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    }
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
