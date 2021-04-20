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

exports.getUsers = async (page, limit) => {
  try {
    const offset = 0 + (page - 1) * limit; // eslint-disable-line no-mixed-operators
    const allUsers = await User.findAll({ offset, limit });
    return allUsers;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to fetch data from the DB');
  }
};
