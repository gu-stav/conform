const _ = require('lodash');
const path = require('path');
const Render = require('./render');

var Button = function(options) {
  this.options = options;
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
