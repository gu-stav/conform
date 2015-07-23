const _ = require('lodash');
const formatErrors = require('./format-errors');
const Promise = require('bluebird');
const ValidationError = require('../lib/error').ValidationError;

module.exports = function(field, value) {
  var fieldValue;
  var validators;
  var errors = field.errors = [];

  var buildError = function(err) {
    errors.push(new ValidationError(err.message, field));
  };

  if(_.isObject(value)) {
    if(field.attr('name')) {
      if(value.hasOwnProperty(field.attr('name'))) {
        fieldValue = value[field.attr('name')];
      }
    }
  } else {
    fieldValue = value;
  }

  field.value(fieldValue);

  if(typeof(field.validate) !== 'function') {
    return;
  }

  validators = _.map(field.validation(), function(validator, key) {
    return validator(fieldValue).catch(buildError);
  });

  return Promise.all(validators).then(function() {
    return field.errors = formatErrors(errors);
  });
};
