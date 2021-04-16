const { User } = require('../models');
const logger = require('../logger/index');
const errors = require('../errors');
const { formatUserOutput } = require('../serializers/users');

exports.createUser = async payload => {
  try {
    const userCreated = await User.create(payload);

    return formatUserOutput(userCreated);
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Something went wrong trying to save into the DB');
  }
};

exports.getUsers = async (page, limit) => {
  try {
    let offset = 0;
    offset += (page - 1) * limit;
    const allUsers = await User.findAll({ offset, limit });

    const response = await allUsers.map(user => formatUserOutput(user));
    return response;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to fetch data from the DB');
  }
};
