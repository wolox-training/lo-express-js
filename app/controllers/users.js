const UserService = require('../services/users');
const logger = require('../logger/index');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;

    logger.info(`Starting sign up with email ${body.email}`);

    const userCreated = await UserService.createUser(body);

    logger.info(`User ${userCreated.firstName} created succesfully`);

    return res.status(201).send(userCreated);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
