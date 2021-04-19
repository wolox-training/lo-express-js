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
    },
    quoteAPI: {
      clientAPI: process.env.API_QUOTE_URL,
      limit: process.env.API_LIMIT,
      max_length: process.env.WEET_MAX_LENGTH
    }
  },
  isProduction: true
};
