const _ = require('lodash');
const path = require('path');
const Render = require('./render');

var Button = function(options) {
  var defaults = {
        type: 'submit',
        name: 'submit',
      };

  this.options = _.merge({}, options, defaults);
  this.Render = Render;
  this.template = path.join(__dirname, './template/button.jade');
};

Button.prototype = {
  render: function() {
    var locals = {
          attributes: this.options,
          text: this.options.text || '',
        };

    return new this.Render(this.template).render(locals);
  },
};

module.exports = Button;
