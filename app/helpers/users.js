const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger/index');
const errors = require('../errors');
const { secret, token_ttl } = require('../../config').common.session;

exports.encryptPayload = async payload => {
  try {
    const hashed = await bcrypt.hash(payload, 10);

    return hashed;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Something went wrong trying to encrypt password');
  }
};

exports.generateToken = payload => {
  try {
    const token = jwt.sign({ payload }, secret, { expiresIn: token_ttl });
    logger.info('Token generated successfully');
    return { payload, token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
