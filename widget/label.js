const Factory = require('../lib/factory');

var Label = function() {
  return this.init.apply(this, arguments);
};

Label.prototype.template = '../template/label.jade';

Label.prototype.init = function(attributes, text) {
  var self = this;

  /* Only text was passed */
  if(arguments.length === 1 && typeof(attributes) === 'string') {
    text = attributes;
    attributes = {};
  }

  this.attributes = attributes || {};
  this.text = text;

  return this;
};

Label.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'label'}]);
};

module.exports = Label;
