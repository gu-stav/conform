const _ = require('lodash');
const Factory = require('../lib/factory');
const util = require('util');

var Textarea = function() {
  return this.init.apply(this, arguments);
};

util.inherits(Textarea, Factory);
Textarea.prototype.template = '../template/textarea.jade';

Textarea.prototype.init = function(attributes, label) {
  this.value(attributes ? (attributes.value || undefined) : undefined);
  return Factory.prototype.init.apply(this, arguments);
};

Textarea.prototype.render = function() {
  this.attr('value', null);
  return Factory.prototype.render.apply(this, arguments);
};

Textarea.prototype.value = function(value) {
  if(value) {
    return this._value = value;
  }

  return this._value;
};

module.exports = Textarea;
