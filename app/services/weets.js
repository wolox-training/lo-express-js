const axios = require('axios');
const logger = require('../logger');
const { clientAPI, limit } = require('../../config').common.quoteAPI;
const errors = require('../errors');
const { Weet } = require('../models');

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

    return weetCreated;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Something went wrong saving new Weet');
  }
};
