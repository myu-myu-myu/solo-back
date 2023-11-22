require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER || 'user',
      database: process.env.POSTGRES_DB || 'solo',
    },
    migrations: {
      directory: './server/db/migrations',
    },
    seeds: {
      directory: './server/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL,
      migrations: {
        directory: './server/db/migrations',
      },
      seeds: {
        directory: './server/db/seeds',
      },
    },
  },
};
