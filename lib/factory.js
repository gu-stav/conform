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
  attr: function(name, value) {
    switch(arguments.length) {
      case 2:
        /* setter */
        var extend = {};
        extend[name] = value;

        return this.attributes = _.merge({}, this.attributes, extend);
        break;

      case 1:
        if(_.isObject(name)) {
          return this.attributes = _.merge({}, this.attributes, name);
        }

        if(_.isString(name)) {
          if(!this.attributes) {
            return undefined;
          }

          return this.attributes[name] || undefined;
        }
        break;

      case 0:
        /* getter for all attribute */
        return this.attributes;
        break;
    };
  },

  data: function(data) {
    var fillField = function(field) {
      if(field.fields) {
        field.data(data);
        return;
      }

      field.value(data[field.attr('name')] || undefined);
    };

    if(this.fields) {
      _.forEach(this.fields, fillField);
    } else {
      fillField(this);
    }

    return this;
  },

  init: function(attributes, label) {
    this.errors = [];
    this.attr(attributes);

    /* method is not available everywhere */
    if(typeof(this._addLabel) === 'function') {
      this._addLabel(label);
    }

    this.required = true;

    if(this.validators) {
      this.validators = this.validators;
    } else {
      this.validators = {};
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

  _addLabel: function(label) {
    var labelId;

    if(!label) {
      return;
    }

    if(!this.attr('id')) {
      labelId = _.uniqueId((this.attr('name') || 'el') + '_');

      this.attr({
        id: labelId,
      });
    } else {
      labelId = this.attr('id');
    }

    label.attr({
      for: labelId,
    });

    this.label = label;
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
    if(arguments.length === 1) {
      this.attr('value', value);
      return this;
    }

    return this.attr('value');
  },

  validate: function(value) {
    this.errors = [];

    if(this.required === false) {
      return Promise.resolve();
    }

    if(arguments.length === 0) {
      return validateField(this, this.value());
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
