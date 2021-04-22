const { maxLength } = require('../../config').common.quoteAPI;

exports.validateLength = content => (content.length > maxLength ? content.substring(0, maxLength) : content);
