const _ = require('lodash');
const Button = require('./button.js');
const Field = require('./field.js');
const path = require('path');
const Render = require('./render');

var Form = function(instanceOrModel, options) {
  this.options = _.merge({}, options);

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

  button: function(options) {
    var defaults = {
          type: 'submit',
          name: 'submit',
        };

    if(!this.buttons) {
      this.buttons = [];
    }

    this.buttons.push(new Button(_.merge({}, options, defaults)));
  },

  render: function() {
    var locals = {
          attributes: this.options,
          fields: this.fields || [],
          buttons: this.buttons || [],
        };
    console.log(this.Render)
    return new this.Render(this.template).render(locals);
  },
};

module.exports = Form;
