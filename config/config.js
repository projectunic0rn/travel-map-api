require('dotenv').config();
module.exports = {
    "development": {
      "username": process.env.JAWSDB_USERNAME,
      "password": process.env.JAWSDB_PASSWORD,
      "database": process.env.JAWSDB_DATABASE,
      "host": process.env.JAWSDB_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": "your_local_username",
      "password": "your_local_password",
      "database": "your_local_database",
      "host": "your_local_host",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.JAWSDB_USERNAME,
      "password": process.env.JAWSDB_PASSWORD,
      "database": process.env.JAWSDB_DATABASE,
      "host": process.env.JAWSDB_HOST,
      "dialect": "mysql"
    }
  }