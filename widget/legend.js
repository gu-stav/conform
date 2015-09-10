const Factory = require('../lib/factory');
const Label = require('./label');
const util = require('util');

var Legend = function() {
  return this.init.apply(this, arguments);
};

util.inherits(Legend, Label);
Legend.prototype.template = '../template/legend.jade';

Legend.prototype.render = function() {
  return Factory.prototype.render.apply(this, [{prefix: 'legend'}]);
};

module.exports = Legend;
