const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger/index');
const errors = require('../errors');
const { secret, tokenTTL } = require('../../config').common.session;

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
    const token = jwt.sign({ payload }, secret, { expiresIn: tokenTTL });
    logger.info('Token generated successfully');
    return { payload, token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

exports.obtainPosition = score => {
  let position; // eslint-disable-line
  if (score <= 5) position = 'Developer';
  else if (score <= 9) position = 'Lead';
  else if (score <= 19) position = 'TL';
  else if (score <= 29) position = 'EM';
  else if (score <= 49) position = 'HEAD';
  else position = 'CEO';

  return position;
};
