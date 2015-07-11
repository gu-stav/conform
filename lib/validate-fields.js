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

    return field.validate(data[field.attributes.name] || undfined);
  });

  return Promise
          .all(fieldPromises)
          .then(function(errors) {
            return _.flatten(errors);
          });
};
