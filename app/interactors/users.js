const bcrypt = require('bcrypt');

const { User } = require('../models');
const errors = require('../errors');

exports.findAndDecryptPassword = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }
  throw errors.badRequestError('Wrong user or password');
};
