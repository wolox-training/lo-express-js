const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const errors = require('../../errors');
const { secret } = require('../../../config').common.session;
const logger = require('../../logger');

exports.checkExistingEmail = async (req, _, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return next(errors.conflictError('Trying to create a user that already exists'));
  }
  return next();
};

exports.verifyAuthentication = (req, _, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(errors.loginError('Unauthorized user'));
    }
    req.token = jwt.verify(token, secret);
    return next();
  } catch (error) {
    logger.error(error);
    return next(errors.loginError('Token invalid'));
  }
};

exports.verifyAdmin = async (req, _, next) => {
  const { payload } = req.token;
  const user = await User.findOne({ where: { email: payload } });

  if (user.role !== 'admin') {
    return next(errors.authorizationError('You are not authorized to access this resource'));
  }
  return next();
};

exports.idVerify = async (req, _, next) => {
  const { payload } = req.token;
  const user = await User.findOne({ where: { email: payload } });

  if (!user) {
    return next(errors.notFoundError('UserId not found'));
  }

  req.userId = user.id; // eslint-disable-line
  return next();
};
