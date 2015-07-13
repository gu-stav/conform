const _ = require('lodash');
const Factory = require('../lib/factory');

var Form = function() {
  return this.init.apply(this, arguments);
};

Form.prototype = {
  template: '../template/form.jade',

  init: function(fields, attributes) {
    var self = this;
    var attrDefaults = {
      method: 'post',
      action: '',
    };

    this._addFields(fields);
    this.attributes = _.merge(attrDefaults, attributes);
    this.required = true;
  },

  _addFields: function() {
    return Factory.prototype._addFields.apply(this, arguments);
  },

  render: function() {
    return Factory.prototype.render.apply(this, [{prefix: 'form'}]);
  },

  validation: function() {
    return Factory.prototype.validation.apply(this, arguments);
  },

  validate: function() {
    return Factory.prototype.groupValidate.apply(this, arguments);
  },
};

module.exports = Form;
