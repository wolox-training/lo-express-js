const { User } = require('../models');
const logger = require('../logger/index');
const errors = require('../errors');

exports.createUser = async payload => {
  try {
    const userCreated = await User.create(payload);

    return userCreated;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Something went wrong trying to save into the DB');
  }
};

exports.getUsers = async pagination => {
  try {
    const allUsers = await User.findAll({ offset: 0, limit: pagination });

    return allUsers;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to fetch data from the DB');
  }
};
