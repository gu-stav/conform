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

Choice.prototype.init = function(name, choices, label) {
  this.attributes = {
    name: name,
  };

  var createChoice = function(name, choice) {
    var defaults = {
      type: 'radio',
      name: name,
    },
    label = new Label({}, choice.text || '');

    choice = _.assign(_.omit(choice, ['text']), defaults);
    return new Input(choice, label);
  };

  if(choices && choices.length) {
    this.choices = _.map(choices, function(choice, index) {
      return createChoice(name, choice);
    });
  } else {
    this.choices = [];
    this.choices.push(createChoice(name, choice));
  }

  Factory.prototype.init.apply(this, [{}, label]);
};

module.exports = Choice;
