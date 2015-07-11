const _ = require('lodash');
const Factory = require('./factory');
const path = require('path');
const Promise = require('bluebird');

var Form = function() {
  this.init.apply(this, arguments);
};

Form.prototype = {
  template: path.join(__dirname, '../template/form.jade'),

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
            .settle(fieldPromises)
            .then(function(errors) {
              console.log(errors);
            });
  },
};

module.exports = Form;
