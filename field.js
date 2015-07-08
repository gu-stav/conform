const _ = require('lodash');
const path = require('path');
const Render = require('./render');

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
        };

    locals.attributes = _.omit(locals.attributes, ['class', 'label']);
    return new this.Render(this.template).render(locals);
  },
};

module.exports = Field;
