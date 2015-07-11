const Factory = require('./factory');

var Fieldset = function() {
  this.init.apply(this, arguments);
};

Fieldset.prototype = new Factory();
Fieldset.prototype.constructor = Fieldset;

Fieldset.prototype.template = '../template/fieldset.jade';

Fieldset.prototype.init = function(fields, attributes, legend) {
  this.legend = legend;
  this.attributes = attributes;

  if(fields && fields.length) {
    this.fields = fields;
  } else {
    this.fields = [];

    if(!fields instanceof Array) {
      this.fields.push(fields);
    }
  }

  return this;
};

Fieldset.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'fieldset'}]);
}

delete Fieldset.prototype.validate;

module.exports = Fieldset;
