const Factory = require('./factory');

var Input = function() {
  this.init.apply(this, arguments);
};

Input.prototype = new Factory();
Input.prototype.constructor = Input;

Input.prototype.template = '../template/input.jade';

module.exports = Input;
