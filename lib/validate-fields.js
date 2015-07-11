const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(fields, data, options) {
  if(!data) {
    data = {};
  }

  if(!options) {
    options = {};
  }

  var fieldPromises = _.map(fields, function(field) {
    var fieldName = field.attributes.name;

    if(typeof(field.validate) !== 'function') {
      return false;
    }

    /* Widget has subfields, so we have to pass the full data in */
    if(field.fields) {
      return field.validate(data);
    }

    if(options.name) {
      fieldName = options.name;
    }

    return field.validate(data[fieldName] || undefined);
  });

  return Promise
          .all(fieldPromises)
          .then(function(errors) {
            errors = _.flatten(errors);
            errors = _.compact(errors);
            return errors;
          });
};
