const _ = require('lodash');
const Factory = require('./factory');
const path = require('path');

var Textarea = function() {
  this.init.apply(this, arguments);
};

Textarea.prototype = new Factory();
Textarea.prototype.constructor = Textarea;

Textarea.prototype.template = path.join(__dirname, '../template/textarea.jade');

Textarea.prototype.init = function(attributes, label) {
  this.value = attributes.value || undefined;
  attributes = _.omit(attributes, ['value']);

  Factory.prototype.init.apply(this, arguments);
};

module.exports = Textarea;
