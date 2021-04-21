const logger = require('../logger/index');
const { getRandomQuote, saveWeet, getAllWeets, rateWeet } = require('../services/weets');
const { validateLength } = require('../helpers/weets');
const { formatWeetOutput } = require('../serializers/weets');

exports.createWeet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { quoteText } = await getRandomQuote();
    logger.info(`Saving new weet with content ${JSON.stringify(quoteText)}`);
    const response = await saveWeet(id, validateLength(quoteText));
    return res.status(201).send(formatWeetOutput(response));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getWeets = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    logger.info('Fetching all weets from database');
    const allWeets = await getAllWeets(page, limit);
    const response = allWeets.map(user => formatWeetOutput(user));
    return res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.rateWeets = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: weetId } = req.params;
    const { score } = req.body;
    const response = await rateWeet(userId, weetId, score);

    return res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
