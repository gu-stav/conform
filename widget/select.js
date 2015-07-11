const _ = require('lodash');
const Factory = require('./factory');

var Select = function() {
  return this.init.apply(this, arguments);
};

Select.prototype = new Factory();
Select.prototype.constructor = Select;

Select.prototype.template = '../template/select.jade';

Select.prototype.init = function(options, attributes, label) {
  if(options && options.length) {
    this.options = options;
  } else {
    this.options = [];
    this.options.push(options);
  }

  this.value(attributes ? (attributes.value || undefined) : undefined);

  Factory.prototype.init.apply(this, [attributes, label]);
};

Select.prototype.render = function() {
  this.attributes = _.omit(this.attributes, ['value']);
  return Factory.prototype.render.apply(this, arguments);
};

Select.prototype.value = function(value) {
  var self = this;

  if(value) {
    this._value = value

    if(this.options && this.options.length > 0) {
      _.forEach(this.options, function(option) {
        if(option.attributes.value && option.attributes.value === self._value) {
          option.attributes.selected = 'selected';
        } else {
          delete option.attributes.selected;
        }
      });
    }
  }

  return this._value;
};

module.exports = Select;
