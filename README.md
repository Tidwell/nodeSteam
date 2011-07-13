# node-steam

A [node.js](http://github.com/joyent/node) wrapper for Valve's [Steam Web API](http://developer.valvesoftware.com/wiki/Steam_Web_API).  Also supports the methods provided for [TF2/TF2Beta/Portal](http://wiki.teamfortress.com/wiki/WebAPI).

## Installation

  npm install steam
  

### Methods

  All methods accept a single options object.  The key names match the query string parameters specified in the valve documentation. (Additional docs coming soon.  For now, see usage and the valve documentation for any questions).
  
  If using JSON for results (default), the result will automatically be parsed into a json object before being passed to the callback.  Any other formats will return the raw data (xml or vdf).  Use of the API requires an API key, obtainable [here](http://steamcommunity.com/dev/apikey).  
  
  This implementation is not supported, endorsed, or created by Valve - I'm just a fan.

####getNewsForApp


####getGlobalAchievementPercentagesForApp


####getPlayerSummaries


####getSchema


####getPlayerItems


## Usage

    var steam = require('steam');
    
    var s = new steam({
      apiKey: 'XXXXXXXXXXXXXXXX',
      format: 'json' //optional ['json', 'xml', 'vdf']
    });
    s.getNewsForApp({
      appid: 440,
      count: 3,
      maxlength: 300,
      callback: function(data) {
        console.log(data);
      }
    })
    s.getGlobalAchievementPercentagesForApp({
      gameid: 440,
      callback: function(data) {
        console.log(data);
      }
    });
    s.getPlayerSummaries({
      steamids: ['76561198037414410', '76561197960435530'],
      callback: function(data) {
        console.log(data);
      }
    })
    s.getSchema({
      gameid: 440,
      callback: function(data) {
        console.log(data);
      }
    })
    s.getPlayerItems({
      gameid: 440,
      steamid: '76561197960435530',
      callback: function(data) {
        console.log(data);
      }
    })
