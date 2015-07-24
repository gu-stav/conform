const _ = require('lodash');
const Factory = require('../lib/factory');

var Group = function() {
  return this.init.apply(this, arguments);
};

Group.prototype.template = '../template/group.jade';

Group.prototype.init = function(type, fields, attributes) {
  var self = this;

  this._addFields(fields);
  this.type = type;
  this.required = true;

  return Factory.prototype.init.apply(this, [attributes]);
};

Group.prototype._addFields = function() {
  return Factory.prototype._addFields.apply(this, arguments);
}

Group.prototype.tagStart = function() {
  var self = this;
  var renderAttributes = function() {
    var attrString = ' ';

    _.forEach(self.attr(), function(value, key) {
      attrString += key + '="' + value + '"';
    });

    if(attrString === ' ') {
      attrString = '';
    }

    return attrString;
  };

  return '<' + this.type + renderAttributes() + '>';
};

Group.prototype.attr = function() {
  return Factory.prototype.attr.apply(this, arguments);
};

Group.prototype.data = function() {
  return Factory.prototype.data.apply(this, arguments);
};

Group.prototype.tagEnd = function() {
  return '</' + this.type + '>';
};

Group.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'element'}]);
};

Group.prototype.validation = function() {
  return Factory.prototype.validation.apply(this, arguments);
};

Group.prototype.validate = function() {
  return Factory.prototype.groupValidate.apply(this, arguments);
};

module.exports = Group;
