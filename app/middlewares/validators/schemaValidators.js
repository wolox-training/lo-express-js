const { checkSchema, validationResult } = require('express-validator');

const errors = require('../../errors');

const validateResult = (req, _, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(errors.schemaError(err.mapped()));
  }
  return next();
};

const verifySchema = schema => checkSchema(schema);

exports.validateBySchema = schema => [verifySchema(schema), validateResult];
