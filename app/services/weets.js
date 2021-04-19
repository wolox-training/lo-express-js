const axios = require('axios');
const logger = require('../logger');
const { clientAPI, limit } = require('../../config').common.quoteAPI;
const errors = require('../errors');
const { Weet } = require('../models');
const { formatWeetOutput } = require('../serializers/weets');

exports.getRandomQuote = async () => {
  try {
    const response = await axios.get(clientAPI, {
      params: {
        limit
      }
    });
    const {
      data: {
        data: [payload]
      }
    } = response;
    return payload;
  } catch (error) {
    logger.error(error);
    throw errors.apiError('Something went wrong with external API');
  }
};

exports.saveWeet = async (userId, content) => {
  try {
    const weetCreated = await Weet.create({ userId, content });

    return formatWeetOutput(weetCreated);
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Something went wrong saving new Weet');
  }
};

exports.getAllWeets = async (page, weetLimit) => {
  try {
    let offset = 0;
    offset += (page - 1) * weetLimit;
    const allWeets = await Weet.findAll({ offset, limit: weetLimit });

    const response = await allWeets.map(user => formatWeetOutput(user));
    return response;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to fetch data from the DB');
  }
};
