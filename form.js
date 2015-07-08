const _ = require('lodash');
const Button = require('./button.js');
const Field = require('./field.js');
const path = require('path');
const Promise = require('bluebird');
const Render = require('./render');

var Form = function(instanceOrModel, options) {
  var defaults = {
    action: '',
    method: 'post',
  };

  this.options = _.merge({}, defaults, options);
  this.instanceOrModel = instanceOrModel;

  this.fields = this._constructFields(instanceOrModel);
  this.Render = Render;
  this.template = path.join(__dirname, './template/form.jade');
};

Form.prototype = {
  _getTypeofSeqField: function(field) {
    return field.type.constructor.key;
  },

  _getValueOfSeqField: function(instanceOrModel, fieldName) {
    var value = '';

    if( instanceOrModel.dataValues &&
        instanceOrModel.dataValues[ fieldName ] ) {
      value = instanceOrModel.dataValues[ fieldName ];
    }

    return value;
  },

  _constructFields: function(instanceOrModel) {
    var fields = [],
        self = this;

    _.forEach(instanceOrModel.rawAttributes, function(seqField, seqFieldName) {
      var options = {
        value: self._getValueOfSeqField(instanceOrModel, seqFieldName),
        label: seqFieldName,
        name: seqFieldName,
      };

      if(seqField.validate) {
        options.validate = seqField.validate;
      }

      switch(self._getTypeofSeqField(seqField)) {
        case 'BOOLEAN':
          options.class = 'input';
          options.type = 'checkbox';
          break;

        case 'TEXT':
          options.class = 'textarea';
          break;

        default:
          options.class = 'input';
          options.type = 'text';
      }

      fields.push(new Field(options));
    });

    return fields;
  },

  button: function(optionsOrButton) {
    var button;

    if(!this.buttons) {
      this.buttons = [];
    }

    if(optionsOrButton instanceof Button) {
      button = optionsOrButton;
    } else {
      button = new Button(optionsOrButton);
    }

    this.buttons.push(button);
  },

  render: function() {
    var locals = {
          attributes: this.options,
          fields: this.fields || [],
          buttons: this.buttons || [],
        };

    locals.attributes = _.omit(locals.attributes, ['class']);
    return new this.Render(this.template).render(locals);
  },

  validate: function() {
    var errors = {},
        validateField = function(field) {
          return field.validate();
        };

    return Promise.all(_.map(this.fields, validateField))
            .then(function(err) {
              return _.compact(err);
            })
            .then(function(err) {
              var errObj = {};

              _.forEach(err, function(error) {
                errObj[error.name] = _.omit(error, ['name']);
              });

              return errObj;
            });
  },
};

module.exports = Form;
