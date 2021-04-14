const UserService = require('../services/users');
const logger = require('../logger/index');
const helpers = require('../helpers/users');
const { formatUserInput } = require('../mappers/users');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = formatUserInput(body);

    payload.password = await helpers.encryptPayload(body.password);

    logger.info(`Starting sign up with email ${body.email}`);

    const { firstName, lastName, email, createdAt } = await UserService.createUser(payload);

    logger.info(`User ${firstName} created succesfully`);

    return res.status(201).send({ firstName, lastName, email, createdAt });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email } = req.body;
    logger.info(`Authenticating user with email: ${JSON.stringify(email)}`);
    const response = await helpers.authenticateUser(email);
    return res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { pagination } = req.query;
    const allUsers = await UserService.getUsers(pagination);
    return res.status(200).send(allUsers);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
