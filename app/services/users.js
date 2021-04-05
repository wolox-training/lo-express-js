const bcrypt = require('bcrypt');

const User = require('../models/user');
const logger = require('../logger/index');
const errors = require('../errors');

exports.createUser = async payload => {
  try {
    const [user, created] = await User.create({ where: { email: payload.email }, defaults: payload });

    if (!created) throw errors.badRequestError('User already exists');

    return user;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Unable to create new user in the Database');
  }
};

exports.encryptPayload = async payload => {
  try {
    const hashed = await bcrypt.hash(payload, 10);

    return hashed;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Something went wrong trying to encrypt password');
  }
};
