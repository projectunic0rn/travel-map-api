require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password:
      "XSTAR1232",
    database: "Geornal",
    host: "localhost",
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: true
    // }
  },
  test: {
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
  production: {
    username: "qaufcmuvvrzunc",
    password:
      "22ca2cb5e864a6e9f3da9cd33b34f79a430223425f3a44dcec96fb3da780f520",
    database: "deb2u8aa2ep3cj",
    host: "ec2-23-21-160-38.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    }
  }
};
