require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER || 'user',
      database: process.env.POSTGRES_DB || 'pg',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      hostname: 'dpg-clehuok15k1s73acr97g-a',
      port: '5432',
      database: process.env.DATABASE_URL || 'solo_yczr',
      username: 'user',
      password: 'C0fuFGfICflGvKTdLOATkHB82WKjeuSe',
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  },
};
