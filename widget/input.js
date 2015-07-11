const Factory = require('./factory');
const path = require('path');

var Input = function() {
  this.init.apply(this, arguments);
};

Input.prototype = new Factory();
Input.prototype.constructor = Input;

Input.prototype.template = path.join(__dirname, '../template/input.jade');

module.exports = Input;
