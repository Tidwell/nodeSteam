var steam = require('./app');
var log = require('logging');

var s = new steam({
  apiKey: 'XXXXXXX',
});
s.getPlayerSummaries({
  callback: log,
  steamids: ['76561198037414410', '76561197960435530']  //ids have to be strings
})