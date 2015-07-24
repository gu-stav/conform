const _ = require('lodash');
const formatErrors = require('./format-errors');
const Promise = require('bluebird');
const ValidationError = require('../lib/error').ValidationError;

module.exports = function(field, value) {
  var fieldValue;
  var validators;
  var errors = [];

  var buildError = function(err) {
    errors.push(new ValidationError(err.message, field));
  };

  if(typeof(field.validate) !== 'function') {
    return;
  }

  fieldValue = _.isObject(value) ?
                (value[field.attr('name')] || undefined) :
                value;

  validators = _.map(field.validation(), function(validator, key) {
    return validator(fieldValue).catch(buildError);
  });

  return Promise.all(validators).then(function() {
    return field.errors = formatErrors(errors);
  });
};
