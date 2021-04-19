exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME,
      admin_role: process.env.ADMIN_ROLE
    },
    session: {
      secret: 'some-super-secret',
      token_ttl: process.env.TOKEN_TTL
    }
  },
  isProduction: true
};
