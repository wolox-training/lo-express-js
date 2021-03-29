exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    clientAPI: 'https://quote-garden.herokuapp.com/api/v3/quotes',
    limit: 1
  },
  isProduction: true
};
