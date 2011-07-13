# node-steam

A [node.js](http://github.com/joyent/node) wrapper for Valve's [Steam Web API](http://developer.valvesoftware.com/wiki/Steam_Web_API).  Also supports the methods provided for [TF2/TF2Beta/Portal](http://wiki.teamfortress.com/wiki/WebAPI).

## Installation

  npm install steam
  

### Methods

  Note that all methods accept a single options object.  The key names match the query string parameters specified in the valve documentation.

####getNewsForApp

####getGlobalAchievementPercentagesForApp

####getPlayerSummaries

####getSchema

####getPlayerItems

## Usage

    var steam = require('./app');
    var log = require('logging');
    
    var s = new steam({
      apiKey: '',
    });
    s.getPlayerSummaries({
      callback: log,
      steamids: ['76561198037414410', '76561197960435530']  //ids have to be strings
    })