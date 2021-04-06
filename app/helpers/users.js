const bcrypt = require('bcrypt');

const logger = require('../logger/index');
const errors = require('../errors');

exports.encryptPayload = async payload => {
  try {
    const hashed = await bcrypt.hash(payload, 10);

    return hashed;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Something went wrong trying to encrypt password');
  }
};
