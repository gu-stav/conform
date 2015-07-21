const Factory = require('../lib/factory');

var Input = function() {
  return this.init.apply(this, arguments);
};

Input.prototype = new Factory();
Input.prototype.constructor = Input;
Input.prototype.template = '../template/input.jade';

Input.prototype.init = function(attributes, label) {
  this.attr({
    type: 'text',
  });

  return Factory.prototype.init.apply(this, arguments);
};

module.exports = Input;
