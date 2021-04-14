const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger/index');
const errors = require('../errors');
const config = require('../../config');

exports.encryptPayload = async payload => {
  try {
    const hashed = await bcrypt.hash(payload, 10);

    return hashed;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Something went wrong trying to encrypt password');
  }
};

exports.authenticateUser = email => {
  try {
    const {
      common: {
        session: { secret }
      }
    } = config;
    const token = jwt.sign({ email }, secret, { expiresIn: '6h' });
    logger.info('Token generated successfully');
    return { email, token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
