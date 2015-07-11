const _ = require('lodash');
const Factory = require('./factory');
const Input = require('./input');
const Label = require('./label');

var Choice = function() {
  return this.init.apply(this, arguments);
};

Choice.prototype = new Factory();
Choice.prototype.constructor = Choice;

Choice.prototype.template = '../template/radio-choice.jade';

Choice.prototype.init = function(attributes, choices, label) {
  var self = this;

  this.attributes = attributes || {};

  var createChoice = function(name, choice) {
    var defaults = {
      type: 'radio',
      name: name,
    },
    label = new Label({}, choice.text || ''),
    choiceOptions = _.omit(choice, ['text']);

    return new Input(_.merge(defaults, choiceOptions), label);
  };

  if(choices && choices.length) {
    this.choices = _.map(choices, function(choice, index) {
      return createChoice(self.attributes.name, choice);
    });
  } else {
    this.choices = [];
    this.choices.push(createChoice(self.attributes.name, choices));
  }

  this.value(this.attributes.value || undefined);

  Factory.prototype.init.apply(this, [{}, label]);
};

Choice.prototype.value = function(value) {
  var self = this;

  if(value) {
    this._value = value

    if(this.choices && this.choices.length > 0) {
      _.forEach(this.choices, function(choice) {
        if(choice.attributes.value && choice.attributes.value === self._value) {
          choice.attributes.checked = 'checked';
        } else {
          delete choice.attributes.checked;
        }
      });
    }
  }

  return this._value;
};

module.exports = Choice;
