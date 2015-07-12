const _ = require('lodash');

var formatErrors = function(errors) {
  errors = _.flatten(errors);
  errors = _.compact(errors);

  if(errors && errors.length === 0) {
    return undefined;
  }

  return errors;
};

module.exports = formatErrors;
