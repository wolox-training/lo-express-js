const UserModel = require('../../models/user');
const errors = require('../../errors');

exports.checkExistingEmail = async email => {
  const user = await UserModel.findOne({ where: { email } });

  if (user) throw errors.badRequestError('User already exists');
};

exports.checkPasswordRestriction = password => {
  const isAlphanumericRegex = /[^a-z\d]/i;

  const isAlphanumeric = isAlphanumericRegex.test(password);

  if (!isAlphanumeric || password.length >= 8) {
    throw errors.badRequestError('Password should have 8 characters minimum');
  }
};

exports.checkEmailRestriction = email => {
  const isAWoloxDomainRegex = /^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/;

  const isAWoloxDomain = isAWoloxDomainRegex.test(email);

  if (!isAWoloxDomain) {
    throw errors.badRequestError('The domain is not part of Wolox');
  }
};
