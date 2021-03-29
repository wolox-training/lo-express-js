exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    clientAPI: 'https://quote-garden.herokuapp.com/api/v3/quotes',
    limit: 1
  },
  isDevelopment: true
};
