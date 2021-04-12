const UserService = require('../services/users');
const logger = require('../logger/index');
const helpers = require('../helpers/users');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = body;

    body.password = await helpers.encryptPayload(payload.password);

    logger.info(`Starting sign up with email ${body.email}`);

    const { firstName, lastName, email, createdAt } = await UserService.createUser(body);

    logger.info(`User ${firstName} created succesfully`);

    return res.status(201).send({ firstName, lastName, email, createdAt });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
