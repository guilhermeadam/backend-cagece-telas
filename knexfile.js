// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '192.168.1.11',
      port: '5432',
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '192.168.1.10',
      port: '5432',
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
