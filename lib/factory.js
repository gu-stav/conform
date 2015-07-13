const _ = require('lodash');
const async = require('async');
const path = require('path');
const Promise = require('bluebird');
const Render = require('../lib/render');
const validateField = require('./validate-field');
const validateFields = require('./validate-fields');

var Factory = function() {
  return this.init.apply(this, arguments);
};

Factory.prototype = {
  init: function(attributes, label) {
    this.errors = [];
    this.attributes = _.merge({}, this.attributes, attributes);
    this.required = true;

    if(this.validators) {
      this.validators = this.validators;
    } else {
      this.validators = {};
    }

    if(label) {
      this.label = label;

      if(this.attributes.id) {
        this.label.attributes.for = this.attributes.id;
      }
    }

    return this;
  },

  _addFields: function(fields) {
    if(!this.fields) {
      this.fields = [];
    }

    if(!fields) {
      return;
    }

    this.fields.push(fields);
    this.fields = _.flatten(this.fields);
  },

  isValid: function() {
    return this.errors === undefined || (this.errors && this.errors.length === 0);
  },

  render: function(options) {
    if(!options) {
      options = {};
    }

    var filepath = path.join(__dirname, this.template);
    var locals = {};
    var prefix = options.prefix || 'field';

    locals[prefix] = this;
    return new Render(filepath).render(locals);
  },

  validation: function(validation) {
    if(validation) {
      return this.validators = _.assign({}, this.validators, validation);
    } else {
      if(_.keys(this.validators).length === 0) {
        return undefined;
      }

      return this.validators;
    }
  },

  value: function(value) {
    if(value) {
      if(!this.attributes) {
        this.attributes = {};
      }

      return this.attributes.value = value;
    }

    if(this.attributes && this.attributes.value) {
      return this.attributes.value;
    }

    return;
  },

  validate: function(value) {
    if(this.required === false) {
      return Promise.resolve();
    }

    return validateField(this, value);
  },

  groupValidate: function(value) {
    this.errors = [];

    if(this.required === false) {
      return Promise.resolve();
    }

    return validateFields(this.fields, value);
  },
};

module.exports = Factory;
