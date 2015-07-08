const _ = require('lodash');
const path = require('path');
const Render = require('./render');
const validator = require('validator');

var Field = function(options) {
  this.options = options;
  this.Render = Render;
  this.template = path.join(__dirname, './template/' + this.options.class + '.jade');
  this.idPrefix = 'seform_';
};

Field.prototype = {
  render: function() {
    var label = {
          text: this.options.label || '',
          attributes: {
            for: this.idPrefix + this.options.name || '',
          },
        },
        defaultAttributes = {
          id: this.idPrefix + this.options.name || '',
        },
        locals = {
          label: label,
          attributes: _.merge({}, this.options, defaultAttributes),
          error: this.error || undefined,
        };

    locals.attributes = _.omit(locals.attributes, ['class', 'label', 'validate']);
    return new this.Render(this.template).render(locals);
  },

  validate: function() {
    var result = {
          name: this.options.name,
          valid: true,
        },
        self = this;

    return new Promise(function(resolve, reject) {
      /* No validation was set, so it must be valid */
      if(!self.options.validate) {
        return resolve();
      }

      _.forEach(self.options.validate, function(validation, index) {
        if(typeof(validation) === 'function') {
          if(!validator[index]) {
            validator.extend(index, validation);
          }
        }

        result.valid = validator[index](self.options.value);

        if(result.valid) {
          return resolve();
        }

        if(!result.valid && validation.msg) {
          result.message = validation.msg;
        }

        result = _.omit(result, ['valid']);
        console.log('set error for field')
        self.error = result;
        resolve(result);
      });
    });
  },
};

module.exports = Field;
