exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    session: {
      secret: 'some-super-secret'
    }
  },
  isDevelopment: true
};
