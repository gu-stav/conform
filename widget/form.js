const _ = require('lodash');
const Factory = require('../lib/factory');

var Form = function() {
  return this.init.apply(this, arguments);
};

Form.prototype = {
  template: '../template/form.jade',

  attr: function() {
    return Factory.prototype.attr.apply(this, arguments);
  },

  data: function() {
    return Factory.prototype.data.apply(this, arguments);
  },

  init: function(fields, attributes) {
    var self = this;
    var attrDefaults = {
      method: 'post',
      action: '',
    };

    this._addFields(fields);
    this.attr(_.merge({}, attrDefaults, attributes));
    this.required = true;

    return this;
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
