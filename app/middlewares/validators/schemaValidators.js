const { checkSchema, validationResult } = require('express-validator');
const logger = require('../../logger');

const errors = require('../../errors');

const validateResult = (req, _, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    logger.info(`Error está compuesto de: ${JSON.stringify()}`);
    return next(errors.schemaError(err.errors[0].msg));
  }
  return next();
};

const verifySchema = schema => checkSchema(schema);

exports.validateBySchema = schema => [verifySchema(schema), validateResult];
