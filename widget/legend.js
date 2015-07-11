const Factory = require('./factory');
const Label = require('./label');

var Legend = function() {
  return this.init.apply(this, arguments);
};

Legend.prototype = new Label();
Legend.prototype.constructor = Legend;

Legend.prototype.template = '../template/legend.jade';

Legend.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'legend'}]);
};

module.exports = Legend;
