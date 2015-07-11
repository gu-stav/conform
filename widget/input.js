const Factory = require('./factory');

var Input = function() {
  this.init.apply(this, arguments);
};

Input.prototype = new Factory();
Input.prototype.constructor = Input;

Input.prototype.template = '../template/input.jade';

Input.prototype.init = function(attributes, label) {
  var attrDefaults = {
    type: 'text',
  };

  this.attributes = attrDefaults;
  Factory.prototype.init.apply(this, arguments);
};

module.exports = Input;