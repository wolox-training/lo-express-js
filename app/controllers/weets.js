const logger = require('../logger/index');
const { getRandomQuote, saveWeet } = require('../services/weets');
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
