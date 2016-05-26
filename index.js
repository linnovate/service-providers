var providers = ['google','microsoft','custom'];
var activeProvider = 'google'; // TODO take from config
module.exports = require(__dirname + '/providers/' + activeProvider + '/services/index.js');