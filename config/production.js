exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    session: {
      secret: 'some-super-secret'
    }
  },
  isProduction: true
};
