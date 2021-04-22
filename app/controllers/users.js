const UserService = require('../services/users');
const logger = require('../logger/index');
const helpers = require('../helpers/users');
const { formatUserInput } = require('../mappers/users');
const { findAndDecryptPassword, saveToken } = require('../interactors/users');
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
    const { id } = await findAndDecryptPassword(email, password);
    logger.info(`Authenticating user with email: ${JSON.stringify(email)}`);
    const { payload, token } = helpers.generateToken({ email, id });
    const savedToken = await saveToken(payload, token);
    logger.info(`Token saved in database: ${JSON.stringify(savedToken)}`);
    return res.status(200).send({ email: payload.email, token });
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
    const response = await allUsers.map(user => formatUserOutput(user));
    return res.status(200).send(response);
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

    logger.info(`Admin ${response.firstName} created succesfully`);

    return res.status(201).send(formatUserOutput(response));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.invalidateAll = async (req, res, next) => {
  try {
    const { id } = req.user;

    const deletedTokens = await UserService.invalidateAll(id);
    logger.info(`The number of tokens deleted are: ${deletedTokens}`);
    return res.status(200).send({ message: 'all sessions invalidated successfully' });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
