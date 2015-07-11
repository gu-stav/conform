const _ = require('lodash');
const Factory = require('../lib/factory');
const validateFields = require('../lib/validate-fields');

var Select = function() {
  return this.init.apply(this, arguments);
};

Select.prototype = new Factory();
Select.prototype.constructor = Select;

Select.prototype.template = '../template/select.jade';

Select.prototype.init = function(fields, attributes, label) {
  if(fields && fields.length) {
    this.fields = fields;
  } else {
    this.fields = [];
    this.fields.push(fields);
  }

  this.value(attributes ? (attributes.value || undefined) : undefined);

  return Factory.prototype.init.apply(this, [attributes, label]);
};

Select.prototype.render = function() {
  this.attributes = _.omit(this.attributes, ['value']);
  return Factory.prototype.render.apply(this, arguments);
};

Select.prototype.value = function(value) {
  var self = this;

  if(value) {
    this._value = value

    if(this.fields && this.fields.length > 0) {
      _.forEach(this.fields, function(field) {
        if(field.attributes.value && field.attributes.value === self._value) {
          field.attributes.selected = 'selected';
        } else {
          delete field.attributes.selected;
        }
      });
    }
  }

  return this._value;
};

Select.prototype.validate = function(data) {
  var self = this;

  if(typeof(data) !== 'Object') {
    var origData = data;
    data = {};

    if(this.attributes.name) {
      data[this.attributes.name] = origData;
    }
  }

  return validateFields(this.fields, data, {name: this.attributes.name || undefined})
          .then(function(errors) {
            return self.errors = errors;
          });
};

module.exports = Select;
