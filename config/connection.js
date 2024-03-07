// Database connection setup.
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
  ? // Connect to the JAWSDB hosted database on Heroku.
  new Sequelize(process.env.JAWSDB_URL)
  : // Else, connect to a local database.
  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = sequelize;