exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST,
      admin_role: process.env.ADMIN_ROLE
    },

    session: {
      secret: 'some-super-secret',
      token_ttl: process.env.TOKEN_TTL
    }
  }
};
