const _ = require('lodash');
const Factory = require('../lib/factory');
const Promise = require('bluebird');
const util = require('util');

var Select = function() {
  return this.init.apply(this, arguments);
};

util.inherits(Select, Factory);
Select.prototype.template = '../template/select.jade';

Select.prototype.init = function(fields, attributes, label) {
  var self = this;

  this._addFields(fields);
  this.value(attributes ? (attributes.value || undefined) : undefined);

  this.validation({
    _fields: function(value) {
      return new Promise(function(resolve, reject) {
        var match = false;

        _.forEach(self.fields, function(field) {
          if(field.value() === value) {
            match = true;
            return false;
          }
        });

        if(match === false) {
          throw new Error('Please select at least one option');
        } else {
          resolve();
        }
      });
    },
  });

  return Factory.prototype.init.apply(this, [attributes, label]);
};

Select.prototype.render = function() {
  this.attr('value', null);
  return Factory.prototype.render.apply(this, arguments);
};

Select.prototype.value = function(value) {
  var self = this;

  if(value) {
    this._value = value

    if(this.fields && this.fields.length > 0) {
      _.forEach(this.fields, function(field) {
        if(field.value() === self._value) {
          field.attr('selected', 'selected');
        } else {
          delete field.attributes.selected;
        }
      });
    }
  }

  return this._value;
};

module.exports = Select;
