const { User } = require('../models');
const logger = require('../logger/index');
const errors = require('../errors');
const Validators = require('../middlewares/validators/users');
const helpers = require('../helpers/users');

exports.createUser = async payload => {
  try {
    const body = payload;
    if (
      !Validators.checkEmailRestriction(body.email) ||
      (await Validators.checkExistingEmail(body.email)) ||
      !Validators.checkPasswordRestriction(body.password)
    ) {
      throw errors.badRequestError('The submited information contains errors');
    }

    body.password = await helpers.encryptPayload(payload.password);

    const userCreated = await User.create(body);

    return userCreated;
  } catch (error) {
    logger.error(error);
    throw Error(error);
  }
};
