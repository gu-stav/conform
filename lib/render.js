const jade = require('jade');

var Render = function(filePath, jadeOptions) {
  var options = jadeOptions || {};

  this.template = jade.compileFile(filePath, options);
};

Render.prototype = {
  render: function(locals) {
    return this.template(locals);
  },
};

module.exports = Render;
