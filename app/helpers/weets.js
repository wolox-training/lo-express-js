const { max_length } = require('../../config').common.quoteAPI;

exports.validateLength = content =>
  content.length > max_length ? content.substring(0, max_length) : content;
