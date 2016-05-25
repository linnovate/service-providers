var providers = ['google','microsoft','custom'];
var activeProvider = 'google'; // TODO take from config
provider = require('./providers/' + activeProvider + '/index.js');
console.log(provider);
