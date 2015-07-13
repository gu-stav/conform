const _ = require('lodash');
const formatErrors = require('./format-errors');
const Promise = require('bluebird');
const validateField = require('./validate-field');

const validateFields = function(fields, value) {
  return Promise.map(fields, function(field) {
    if(field.fields) {
      /* Thing maintains its own validate function */
      if(field.validation()) {
        return field.validate(value);
      }

      return validateFields(field.fields, value);
    } else {
      return validateField(field, value);
    }
  }).then(formatErrors);
};

module.exports = validateFields;
