const Factory = require('../lib/factory');

var Fieldset = function() {
  return this.init.apply(this, arguments);
};

Fieldset.prototype = new Factory();
Fieldset.prototype.constructor = Fieldset;

Fieldset.prototype.template = '../template/fieldset.jade';

Fieldset.prototype.init = function(fields, attributes, legend) {
  this.legend = legend;
  this.attributes = attributes;
  this._addFields(fields);

  return this;
};

Fieldset.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'fieldset'}]);
}

Fieldset.prototype.validate = function(data) {
  return Factory.prototype.groupValidate.apply(this, arguments);
};

module.exports = Fieldset;
