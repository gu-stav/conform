const Factory = require('../lib/factory');
const util = require('util');

var Option = function() {
  return this.init.apply(this, arguments);
};

util.inherits(Option, Factory)
Option.prototype.template = '../template/option.jade';

Option.prototype.init = function(attributes, text) {
  this.attributes = attributes;
  this.text = (text || value) || '';

  return this;
};

delete Option.prototype.validation;
delete Option.prototype.validate;

module.exports = Option;
