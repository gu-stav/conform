const _ = require('lodash');
const Factory = require('./factory');

var Textarea = function() {
  this.init.apply(this, arguments);
};

Textarea.prototype = new Factory();
Textarea.prototype.constructor = Textarea;

Textarea.prototype.template = '../template/textarea.jade';

Textarea.prototype.init = function(attributes, label) {
  this.value(attributes ? (attributes.value || undefined) : undefined);
  return Factory.prototype.init.apply(this, arguments);
};

Textarea.prototype.render = function() {
  this.attributes = _.omit(this.attributes, ['value']);
  return Factory.prototype.render.apply(this, arguments);
};

Textarea.prototype.value = function(value) {
  if(value) {
    return this._value = value;
  }

  return this._value;
};

module.exports = Textarea;
