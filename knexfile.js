// Update with your config settings.
const dotenv = require('dotenv')
dotenv.config({path:  `${__dirname}/.env`})

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.db_name,
      localhost:process.env.db_host,
      user:  process.env.db_root,
      password: process.env.db_pass
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'./migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'./migrations'
    }
  }

};
