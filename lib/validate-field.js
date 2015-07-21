const _ = require('lodash');
const formatErrors = require('./format-errors');
const Promise = require('bluebird');
const ValidationError = require('../lib/error').ValidationError;

module.exports = function(field, value) {
  var fieldValue;
  var validators;
  var errors = field.errors = [];

  var buildError = function(err) {
    errors.push(new ValidationError(err.message));
  };

  if(typeof(value) === 'object') {
    if(field.attributes && field.attributes.name) {
      if(value.hasOwnProperty(field.attributes.name)) {
        fieldValue = value[field.attributes.name];
      }
    }
  } else {
    fieldValue = value;
  }

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