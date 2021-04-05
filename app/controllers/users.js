const UserService = require('../services/users');
const Validators = require('../middlewares/validators/users');
const logger = require('../logger/index');
const errors = require('../errors');

exports.signUp = async ({ body }, res) => {
  const { email, password } = body;

  if (
    !Validators.checkEmailRestriction(email) ||
    !(await Validators.checkExistingEmail(email)) ||
    !Validators.checkPasswordRestriction(password)
  ) {
    throw errors.badRequestError('The submited information contains errors');
  }

  const encryptedPassword = UserService.encryptPayload(password);

  const userCreated = await UserService.createUser({ ...body, password: encryptedPassword });

  logger.info(`User ${userCreated.firstName} created succesfully`);

  return res.status(201).send(userCreated);
};
