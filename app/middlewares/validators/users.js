const { User } = require('../../models');
const errors = require('../../errors');

exports.checkExistingEmail = async email => {
  const user = await User.findOne({ where: { email } });

  if (user) throw errors.conflictError('Trying to create a user that already exists');
  return false;
};

exports.checkPasswordRestriction = password => {
  const isAlphanumericRegex = /[a-zA-Z0-9]{8,61}/;

  const isAlphanumeric = isAlphanumericRegex.test(password);

  if (!isAlphanumeric) {
    throw errors.badRequestError(
      'Password should have 8 characters minimum and only alphanumeric characters'
    );
  }
  return isAlphanumeric;
};

exports.checkEmailRestriction = email => {
  const isAWoloxDomainRegex = /^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/;

  const isAWoloxDomain = isAWoloxDomainRegex.test(email);

  if (!isAWoloxDomain) {
    throw errors.badRequestError('The domain is not part of Wolox');
  }
  return isAWoloxDomain;
};
