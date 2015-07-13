const _ = require('lodash');
const Factory = require('../lib/factory');
const Input = require('./input');
const Label = require('./label');

var Choice = function() {
  return this.init.apply(this, arguments);
};

Choice.prototype = new Factory();
Choice.prototype.constructor = Choice;

Choice.prototype.template = '../template/radio-choice.jade';

Choice.prototype.init = function(attributes, fields, label) {
  var self = this;

  this.attributes = attributes || {};

  var createChoice = function(name, field) {
    var defaults = {
      type: 'radio',
      name: name,
    },
    label = new Label({}, field.text || ''),
    fieldOptions = _.omit(field, ['text']);

    return new Input(_.merge(defaults, fieldOptions), label);
  };


  this._addFields(fields);
  this.fields = _.map(this.fields, function(field, index) {
    return createChoice(self.attributes.name, field);
  });
  this.value(this.attributes.value || undefined);

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

  Factory.prototype.init.apply(this, [{}, label]);
};

Choice.prototype.value = function(value) {
  var self = this;

  if(value) {
    this._value = value

    if(this.fields && this.fields.length > 0) {
      _.forEach(this.fields, function(field) {
        if(field.attributes.value && field.attributes.value === self._value) {
          field.attributes.checked = 'checked';
        } else {
          delete field.attributes.checked;
        }
      });
    }
  }

  return this._value;
};

module.exports = Choice;
