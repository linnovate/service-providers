'use strict'
var providers = ['google', 'microsoft', 'custom'];

module.exports = function(activeProvider) {
	return require(__dirname + '/providers/' + activeProvider + '/services');
};