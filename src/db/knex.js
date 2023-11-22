require('dotenv').config();
const knex = require('knex');
const knexConfig = require('./knexfile');
const env = process.env.NODE_ENV;

module.exports = knex(knexConfig[env]);
