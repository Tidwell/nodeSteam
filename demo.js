var steam = require('./app');
var log = require('logging');

var s = new steam({
  apiKey: '9FE25C516BE06DE9CBA1511C6EF0F1AD',
});
s.getPlayerSummaries({
  callback: log,
  steamids: ['76561198037414410', '76561197960435530']  //ids have to be strings
})