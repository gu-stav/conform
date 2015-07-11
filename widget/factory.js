const _ = require('lodash');
const ValidationError = require('../lib/error').ValidationError;
const path = require('path');
const Promise = require('bluebird');
const Render = require('../lib/render');

var Factory = function() {
  return this.init.apply(this, arguments);
};

Factory.prototype = {
  init: function(attributes, label) {
    this.errors = [];
    this.attributes = _.merge({}, this.attributes, attributes);

    if(label) {
      this.label = label;

      if(this.attributes.id) {
        this.label.attributes.for = this.attributes.id;
      }
    }
  },

  isValid: function() {
    return this.errors.length === 0;
  },

  render: function() {
    var filepath = path.join(__dirname, this.template);

    return new Render(filepath).render(this);
  },

  validators: {},

  validate: function(value) {
    this.errors = [];
    this.value = value;

    var self = this;

    var validations = _.map(this.validators, function(validator, key) {
      return validator(self.value)
              .catch(function(err) {
                self.errors.push(new ValidationError(err.message));
              });
    });

    return Promise.all(validations)
            .then(function() {
              if(self.errors.length === 0) {
                return undefined;
              } else {
                return self.errors;
              }
            });
  },
};

module.exports = Factory;
