const jade = require('jade');

var Render = function(filePath) {
  this.template = jade.compileFile(filePath);
};

Render.prototype = {
  render: function(locals) {
    return this.template(locals);
  },
};

module.exports = Render;
