const jwt = require('jsonwebtoken');

const { User } = require('../models');
const logger = require('../logger/index');
const errors = require('../errors');
const config = require('../../config');

exports.createUser = async payload => {
  try {
    const userCreated = await User.create(payload);

    return userCreated;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Something went wrong trying to save into the DB');
  }
};

exports.authenticateUser = email => {
  try {
    const token = jwt.sign({ email }, config.common.session.secret, { expiresIn: '6h' });
    logger.info('Token generated successfully');
    return { email, token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
