module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'movies',
      user: 'admin',
      password: 'admin',
    },
    migrations: {
      directory: './data/migration',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migration',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
}
