const _ = require('lodash');
const Factory = require('../lib/factory');
const validateFields = require('../lib/validate-fields');

var Group = function() {
  return this.init.apply(this, arguments);
};

Group.prototype.template = '../template/group.jade';

Group.prototype.init = function(type, fields, attributes) {
  this.fields = fields;
  this.type = type;

  return Factory.prototype.init.apply(this, [attributes]);
};

Group.prototype.tagStart = function() {
  var self = this;
  var renderAttributes = function() {
    var attrString = ' ';

    _.forEach(self.attributes, function(value, key) {
      attrString += key + '="' + value + '"';
    });

    if(attrString === ' ') {
      attrString = '';
    }

    return attrString;
  };

  return '<' + this.type + renderAttributes() + '>';
};

Group.prototype.tagEnd = function() {
  return '</' + this.type + '>';
};

Group.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'element'}]);
};

Group.prototype.validate = function(data) {
  return validateFields(this.fields, data);
};

module.exports = Group;
