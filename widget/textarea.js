const _ = require('lodash');
const Factory = require('./factory');

var Textarea = function() {
  this.init.apply(this, arguments);
};

Textarea.prototype = new Factory();
Textarea.prototype.constructor = Textarea;

Textarea.prototype.template = '../template/textarea.jade';

Textarea.prototype.render = function() {
  this.value = this.attributes.value;
  this.attributes = _.omit(this.attributes, ['value']);
  return Factory.prototype.render.apply(this, arguments);
};

module.exports = Textarea;
