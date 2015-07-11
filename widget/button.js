const _ = require('lodash');
const Factory = require('./factory');
const path = require('path');

var Button = function() {
  this.init.apply(this, arguments);
};

Button.prototype = new Factory();
Button.prototype.constructor = Button;

Button.prototype.template = path.join(__dirname, '../template/button.jade');

Button.prototype.init = function(attributes, text) {
  var attrDefaults = {
    type: 'submit',
  };

  if(arguments.length === 1 && typeof(attributes) === 'string') {
    text = attributes;
    attributes = {};
  }

  this.attributes = _.merge({}, attrDefaults, attributes);
  this.text = (text || value) || '';
};

module.exports = Button;
