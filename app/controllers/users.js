const UserService = require('../services/users');
const logger = require('../logger/index');
const helpers = require('../helpers/users');
const { formatUserInput } = require('../mappers/users');
const { findAndDecryptPassword } = require('../interactors/users');
const { formatUserOutput } = require('../serializers/users');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = formatUserInput(body);

    payload.password = await helpers.encryptPayload(body.password);

    logger.info(`Starting sign up with email ${body.email}`);

    const response = await UserService.createUser(payload);

    logger.info(`User ${response.firstName} created succesfully`);

    return res.status(201).send(formatUserOutput(response));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await findAndDecryptPassword(email, password);
    logger.info(`Authenticating user with email: ${JSON.stringify(email)}`);
    const { payload, token } = helpers.generateToken(email);
    return res.status(200).send({ email: payload, token });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const allUsers = await UserService.getUsers(page, limit);
    const response = await allUsers.map(user => formatUserOutput(user));
    return res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
