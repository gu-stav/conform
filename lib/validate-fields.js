const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(fields, data) {
  if(!data) {
    data = {};
  }

  var fieldPromises = _.map(fields, function(field) {
    if(typeof(field.validate) !== 'function') {
      return;
    }

    /* Widget has subfields, so we have to pass the full data in */
    if(field.fields) {
      return field.validate(data);
    }

    return field.validate(data[field.attributes.name] || undefined);
  });

  return Promise
          .all(fieldPromises)
          .then(function(errors) {
            return _.flatten(errors);
          });
};
