const axios = require('axios');
const logger = require('../logger');
const { clientAPI, limit } = require('../../config').common.quoteAPI;
const errors = require('../errors');
const { Weet, Rating, User, sequelize } = require('../models');

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

exports.rateWeet = async (ratingUserId, weetId, score) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();

    const payload = { ratingUserId, weetId, score };

    logger.info('Searching if the weet was rated before');
    const isRated = await Rating.findOne({ where: payload });
    if (!isRated) throw errors.badRequestError('User already submitted this exact rate');

    logger.info('Searching if the weet exists');
    const weetExists = await Weet.findOne({ where: { id: weetId } });
    if (!weetExists) throw errors.badRequestError('The weet does not exist');

    logger.info('Creating rate on database');
    const rateCreated = await Rating.upsert(payload, { returning: true }, { transaction });

    logger.info('Updating position if necessary');
    const weetUser = await User.findOne({ where: { id: weetExists.userId } });

    const totalScore = await Rating.sum('score', { where: { ratingUserId: weetExists.userId }, transaction });
    const position = User.obtainPosition(totalScore);

    logger.info(`Position of ${weetUser.email} is ${position}`);

    await transaction.commit();

    return rateCreated;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(error);
    throw error;
  }
};
