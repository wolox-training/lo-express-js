exports.getAllWeetsSchema = {
  page: {
    in: ['query', 'params'],
    isEmpty: {
      negated: true,
      errorMessage: 'Page is a required param'
    },
    isInt: {
      options: {
        min: 1,
        max: 25
      },
      errorMessage: 'Minimum page has to be between 1 and 25'
    },
    errorMessage: 'Problem with page param'
  },
  limit: {
    in: ['query', 'params'],
    isEmpty: {
      negated: true,
      errorMessage: 'Limit is a required param'
    },
    isInt: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: 'Minimum limit has to be between 1 and 100'
    },
    errorMessage: 'Problem with limit param'
  }
};

exports.rateWeetSchema = {
  score: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Score is a required param'
    },
    isInt: {
      errorMessage: 'Score has to be a number'
    },
    matches: {
      options: /^-?[1]$/,
      errorMessage: 'Score must be either 1 or -1'
    }
  }
};
