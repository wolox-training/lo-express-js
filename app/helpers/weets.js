const { maxLength } = require('../../config').common.quoteAPI;

exports.validateLength = content => (content.length > maxLength ? content.substring(0, maxLength) : content);

exports.obtainPosition = score => {
    let position; // eslint-disable-line
  if (score <= 5) position = 'Developer';
  else if (score <= 9) position = 'Lead';
  else if (score <= 19) position = 'TL';
  else if (score <= 29) position = 'EM';
  else if (score <= 49) position = 'HEAD';
  else position = 'CEO';

  return position;
};
