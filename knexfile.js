// Update with your config settings.
const { client, database } = require('./.env')

module.exports = {
    client: client,
    connection: database,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
