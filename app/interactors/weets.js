const { Rating, Weet } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.ratingValidations = async (ratingUserId, weetId, score) => {
  try {
    const payload = { ratingUserId, weetId, score };
    logger.info(`Searching if the weet was rated before: ${JSON.stringify(payload)}`);
    const isRated = await Rating.findOne({ where: payload });
    if (isRated) throw errors.badRequestError('User already submitted this exact rate');

    logger.info('Searching if the weet exists');
    const weetExists = await Weet.findOne({ where: { id: weetId } });
    if (!weetExists) throw errors.badRequestError('The weet does not exist');

    return weetExists;
  } catch (error) {
    logger.info(error);
    throw error;
  }
};
