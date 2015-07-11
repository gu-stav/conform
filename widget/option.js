const Factory = require('./factory');

var Option = function() {
  return this.init.apply(this, arguments);
};

Option.prototype = new Factory();
Option.prototype.constructor = Option;

Option.prototype.template = '../template/option.jade';

Option.prototype.init = function(attributes, text) {
  this.attributes = attributes;
  this.text = (text || value) || '';
};

delete Option.prototype.validate;

module.exports = Option;
