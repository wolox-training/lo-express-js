const axios = require('axios');
const logger = require('../logger');
const { clientAPI, limit } = require('../../config/index.js').common;

exports.getRandomQuote = async () => {
    try {
        const response = await axios.get(clientAPI, {
            params: {
                limit: limit
            }
        });
        const { data } = response.data;
        return data[0];
    } catch (error) {
        logger.error(error);
        throw Error(error);
    }
}