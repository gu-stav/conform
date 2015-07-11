const _ = require('lodash');
const Factory = require('../lib/factory');
const validateFields = require('../lib/validate-fields');

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

  render: function() {
    return Factory.prototype.render.apply(this, [{prefix: 'form'}]);
  },

  validate: function(data) {
    return validateFields(this.fields, data);
  },
};

module.exports = Form;
