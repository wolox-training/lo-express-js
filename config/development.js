exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    session: {
      secret: 'some-super-secret',
      token_ttl: process.env.TOKEN_TTL
    }
  },
  isDevelopment: true
};
