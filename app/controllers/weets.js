const logger = require('../logger/index');
const { getRandomQuote, saveWeet } = require('../services/weets');
const { validateLength } = require('../helpers/weets');

exports.createWeet = async (req, res, next) => {
  try {
    const { quoteText } = await getRandomQuote();
    logger.info(`Saving new weet with content ${JSON.stringify(quoteText)}`);
    const response = await saveWeet(req.userId, validateLength(quoteText));
    return res.status(201).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};