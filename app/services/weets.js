const axios = require('axios');
const logger = require('../logger');
const { clientAPI, limit } = require('../../config').common.quoteAPI;
const errors = require('../errors');
const { Weet, Rating, User, sequelize } = require('../models');
const { obtainPosition } = require('../helpers/users');

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

exports.getAllWeets = async (page, weetLimit) => {
  try {
    const offset = 0 + (page - 1) * weetLimit; // eslint-disable-line no-mixed-operators
    const allWeets = await Weet.findAll({ offset, limit: weetLimit });

    return allWeets;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to fetch data from the DB');
  }
};

exports.rateWeet = async (ratingUserId, weetId, score, weetData) => {
  let transaction = {};
  let rateResponse = {};
  try {
    transaction = await sequelize.transaction();

    const payload = { ratingUserId, weetId, score };

    logger.info('Finding if it is an update or a create');
    const isRatedWithDifValue = await Rating.findOne({ where: { ratingUserId, weetId } });

    if (isRatedWithDifValue) {
      isRatedWithDifValue.score = score;
      rateResponse = await isRatedWithDifValue.save({ transaction });
    } else {
      rateResponse = await Rating.create(payload, { transaction });
    }

    logger.info('Updating position if necessary');
    const weetUser = await User.findOne({ where: { id: weetData.userId } });

    const totalScore = await Rating.sum('score', { where: { weetId } });
    const position = obtainPosition(totalScore);

    logger.info(`Position of ${weetUser.email} is ${position}`);

    if (position !== weetUser.position) {
      weetUser.position = position;
      await weetUser.save({ transaction });
    }

    await transaction.commit();

    return rateResponse;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(error);
    throw error;
  }
};
