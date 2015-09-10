const Factory = require('../lib/factory');
const util = require('util');

var Input = function() {
  return this.init.apply(this, arguments);
};

util.inherits(Input, Factory);
Input.prototype.template = '../template/input.jade';

Input.prototype.init = function(attributes, label) {
  this.attr({
    type: 'text',
  });

  return Factory.prototype.init.apply(this, arguments);
};

module.exports = Input;
