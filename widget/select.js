const Factory = require('./factory');

var Select = function() {
  return this.init.apply(this, arguments);
};

Select.prototype = new Factory();
Select.prototype.constructor = Select;

Select.prototype.template = '../template/select.jade';

Select.prototype.init = function(options, attributes, label) {
  if(options && options.length) {
    this.options = options;
  } else {
    this.options = [];
    this.options.push(options);
  }

  Factory.prototype.init.apply(this, [attributes, label]);
};

module.exports = Select;
