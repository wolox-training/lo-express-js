const { checkSchema, validationResult } = require('express-validator');
const { User } = require('../../models');
const errors = require('../../errors');

const verifySchema = schema => checkSchema(schema);

const validateResult = (req, _, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(errors.schemaError(err.mapped()));
  }
  return next();
};

exports.validateBySchema = schema => [verifySchema(schema), validateResult];

exports.checkExistingEmail = async (req, _, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return next(errors.conflictError('Trying to create a user that already exists'));
  }
  return next();
};
