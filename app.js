var http = require('http');
var qs = require('querystring');

/* 
url format for sample api request:
http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json */


/*constructor
accepts an object.

.apiKey     required      The steam web API key, obtained from: http://steamcommunity.com/dev/apikey
.format     optional      The format for the response [json, xml, vdf] - default: json
*/
var steam = function(obj) {
  var validFormats = ['json', 'xml', 'vdf'];
  
  //error checking
  if (!obj.apiKey) throw new Error('no API key specified');
  if (obj.format) {
    if (validFormats.indexOf(obj.format)) {
      this.format = obj.format;
    }
    else {
      throw new Error('invalid format specified');
    }
  }
  
  //instance vars
  this.apiKey = obj.apiKey
}

 //defaults
steam.prototype.format = 'json';
steam.prototype.apiKey = '';


//API methods
steam.prototype.getNewsForApp = function(obj) {
  this.validate(obj, 'getNewsForApp');
  obj.path = '/ISteamNews/GetNewsForApp/v0002/?';
  this.makeRequest(obj)
}
steam.prototype.getGlobalAchievementPercentagesForApp = function(obj) {
  this.validate(obj, 'getGlobalAchievementPercentagesForApp');
  obj.path = '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?';
  this.makeRequest(obj)
}
steam.prototype.getPlayerSummaries = function(obj) {
  this.validate(obj, 'getPlayerSummaries');
  obj.path = '/ISteamUser/GetPlayerSummaries/v0002/?',
  this.makeRequest(obj)
}
steam.prototype.getSchema = function(obj) {
  this.validate(obj, 'getSchema')
  obj.path = '/IEconItems_'+obj.gameid+'/GetSchema/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getPlayerItems = function(obj) {
  this.validate(obj, 'getPlayerItems')
  obj.path = '/IEconItems_'+obj.gameid+'/GetPlayerItems/v0001/?';
  this.makeRequest(obj);
}

//internal used to validate an object to send to an api request, could also be used
//by the user if they need to verify the validity of data submitted from an outside source
steam.prototype.validate = function(obj, method) {
  if (!obj) throw new Error('no arguments passed');
  //if the user doesn't pass a callback, it makes no sense
  if (typeof obj.callback != 'function') throw new Error('invalid callback');
  
  switch(method) {
    case 'getGlobalAchievementPercentagesForApp':
      if (!obj.gameid) throw new Error('invalid gameid');
      break;
    case 'getPlayerSummaries':
      if (!obj.steamids) throw new Error('invalid steamids');
      break;
    case 'getSchema':
      if (!obj.gameid) throw new Error('invalid gameid');
  }
}


//internal method used to actually make the request to the steam servers
steam.prototype.makeRequest = function(obj) {
  var format = this.format;
  //clean up the object to get ready to send it to the API
  var callback = obj.callback;
  delete obj.callback;
  var path = obj.path;
  delete obj.path;
  obj.key = this.apiKey;
  obj.format = this.format;

  //generate the path
  var path = path+qs.stringify(obj);
  console.log(path);
  var options = {
    host: 'api.steampowered.com',
    port: 80,
    path: path
  };
  var req = http.get(options, function(res) {
    var resData = '';
    res.on('data', function (chunk) {
      resData+=chunk;
    });
    res.on('end', function(){
      console.log(resData);
      if (format == 'json') resData = JSON.parse(resData)
      callback(resData);
    })
  })

}


module.exports = steam;