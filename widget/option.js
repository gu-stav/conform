const Factory = require('./factory');
const path = require('path');

var Option = function() {
  return this.init.apply(this, arguments);
};

Option.prototype = new Factory();
Option.prototype.constructor = Option;

Option.prototype.template = path.join(__dirname, '../template/option.jade');

Option.prototype.init = function(attributes, text) {
  this.attributes = attributes;
  this.text = (text || value) || '';
};

module.exports = Option;
