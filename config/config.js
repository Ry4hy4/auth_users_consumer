/* istanbul ignore file */
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DB,
    "host": process.env.DBHOST,
    "port" : process.env.DBPORT,
    "dialect": process.env.DBDIALECT,
    "logging" : false,
  },
  "test": {
    "username": process.env.DBUSERNAME_TEST,
    "password": process.env.DBPASSWORD_TEST,
    "database": process.env.DB_TEST,
    "host": process.env.DBHOST_TEST,
    "port" : process.env.DBPORT_TEST,
    "dialect": process.env.DBDIALECT_TEST,
    "logging" : false,
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging" : false,
  }
};