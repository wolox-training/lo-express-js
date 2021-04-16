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

exports.verifyToken = (req, _, next) => {
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
