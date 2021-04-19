const UserService = require('../services/users');
const logger = require('../logger/index');
const helpers = require('../helpers/users');
const { formatUserInput } = require('../mappers/users');
const { findAndDecryptPassword } = require('../interactors/users');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = formatUserInput(body);

    payload.password = await helpers.encryptPayload(body.password);

    logger.info(`Starting sign up with email ${body.email}`);

    const response = await UserService.createUser(payload);

    logger.info(`User ${response.first_name} created succesfully`);

    return res.status(201).send(response);
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
    logger.info('Fetching all users from database');
    const allUsers = await UserService.getUsers(page, limit);
    return res.status(200).send(allUsers);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.signUpAdmin = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = formatUserInput(body);

    payload.password = await helpers.encryptPayload(body.password);

    logger.info(`Starting admin sign up with email ${body.email}`);

    const response = await UserService.createAdmin(payload);

    logger.info(`Admin ${response.first_name} created succesfully`);

    return res.status(201).send(response);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
