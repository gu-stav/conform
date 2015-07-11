const _ = require('lodash');
const Factory = require('./factory');
const Promise = require('bluebird');

var Form = function() {
  this.init.apply(this, arguments);
};

Form.prototype = {
  template: '../template/form.jade',

  init: function(fields, buttons, attributes) {
    var attrDefaults = {
      method: 'post',
      action: '',
    };

    this.fields = fields || [];
    this.buttons = buttons || [];
    this.attributes = _.merge(attrDefaults, attributes);
  },

  render: Factory.prototype.render,

  validate: function(data) {
    if(!data) {
      data = {};
    }

    var fieldPromises = _.map(this.fields, function(field) {
      return field.validate(data[field.attributes.name] || undfined);
    });

    return Promise
            .all(fieldPromises)
            .then(function(errors) {
              return _.flatten(errors);
            });
  },
};

module.exports = Form;
