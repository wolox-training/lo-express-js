const weetService = require('../services/weets');

exports.getQuote = async (_, res) => {
    const data = await weetService.getRandomQuote();
    res.status(200).send(data)
};