const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const errors = require('../../errors');
const config = require('../../../config');
const logger = require('../../logger');

exports.checkExistingEmail = async (req, _, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return next(errors.conflictError('Trying to create a user that already exists'));
  }
  return next();
};

exports.findAndDecryptPassword = async (req, _, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return next();
  }
  return next(errors.badRequestError('Wrong user or password'));
};

exports.verifyToken = (req, _, next) => {
  try {
    const {
      common: {
        session: { secret }
      }
    } = config;
    const token = req.headers.authorization;

    if (!token) {
      return next(errors.loginError('Unauthorized user'));
    }

    jwt.verify(token, secret);
    return next();
  } catch (error) {
    logger.error(error);
    return next(errors.loginError('Token invalid'));
  }
};
