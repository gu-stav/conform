var util = require('util');

var ValidationError = function(message, field) {
  var tmp = Error.apply(this, arguments);
  tmp.name = this.name = 'ValidationError';

  this.message = message;

  if(field) {
    this.field = field;
  }

  if (Error.captureStackTrace)
    Error.captureStackTrace(this, this.constructor);
};

util.inherits(ValidationError, Error);

module.exports = {
  ValidationError: ValidationError,
};