const Factory = require('./factory');

var Label = function() {
  return this.init.apply(this, arguments);
};

Label.prototype.template = '../template/label.jade';

Label.prototype.init = function(attributes, text) {
  var self = this;

  if(arguments.length === 1 && typeof(attributes) === 'string') {
    text = attributes;
    attributes = {};
  }

  this.attributes = attributes || {};
  this.text = text;
  this._templatePrefix = 'label';
};

Label.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'label'}]);
};

module.exports = Label;
