const bcrypt = require('bcrypt');

const { User, Token } = require('../models');
const errors = require('../errors');

exports.findAndDecryptPassword = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw errors.badRequestError('Wrong user or password');
};

exports.saveToken = async (payload, token) => {
  try {
    const { id } = payload;

    const savedToken = await Token.create({ userId: id, token });
    return savedToken;
  } catch (error) {
    throw errors.databaseError('Problem saving token to database');
  }
};
