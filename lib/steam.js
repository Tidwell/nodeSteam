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
  if (typeof obj != 'object') throw new Error('invalid options passed to constructor');
  if (typeof obj.apiKey == 'undefined' || typeof obj.apiKey != 'string') throw new Error('invalid or missing API key');
  if (obj.format) {
    if (validFormats.indexOf(obj.format)>-1) {
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
  if (!this.validate(obj, 'getNewsForApp')) return false;
  obj.path = '/ISteamNews/GetNewsForApp/v0002/?';
  this.makeRequest(obj)
}
steam.prototype.getGlobalAchievementPercentagesForApp = function(obj) {
  if (!this.validate(obj, 'getGlobalAchievementPercentagesForApp')) return false;
  obj.path = '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?';
  this.makeRequest(obj)
}
steam.prototype.getPlayerSummaries = function(obj) {
  if (!this.validate(obj, 'getPlayerSummaries')) return false;
  //turn the array into a comma separated list
  if (typeof obj.steamids == 'object') obj.steamids = obj.steamids.join(',');
  obj.path = '/ISteamUser/GetPlayerSummaries/v0002/?',
  this.makeRequest(obj)
}
steam.prototype.getFriendList = function(obj) {
  if (!this.validate(obj, 'getFriendList')) return false;
  obj.path = '/ISteamUser/GetFriendList/v0001/?',
  this.makeRequest(obj)
}
steam.prototype.getOwnedGames = function(obj) {
    if (!this.validate(obj, 'getOwnedGames')) return false;
    obj.path = '/IPlayerService/GetOwnedGames/v0001/?';
    this.makeRequest(obj);
}
steam.prototype.getSchema = function(obj) {
  if (!this.validate(obj, 'getSchema')) return false;
  obj.path = '/IEconItems_'+obj.gameid+'/GetSchema/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getPlayerItems = function(obj) {
  if (!this.validate(obj, 'getPlayerItems')) return false;
  obj.path = '/IEconItems_'+obj.gameid+'/GetPlayerItems/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getAssetPrices = function(obj) {
  var obj = this.normalizeAppGameId(obj);
  if (!this.validate(obj, 'getAssetPrices')) return false;
  obj.path = '/ISteamEconomy/GetAssetPrices/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getAssetClassInfo = function(obj) {
  //normalize
  var obj = this.normalizeAppGameId(obj);
  if (!this.validate(obj, 'getAssetClassInfo')) return false;
  //convenience allowing to just pass an array of classIds
  if (obj.classIds && !obj.class_count) {
    var i = 0;
    obj.classIds.forEach(function(id){
      obj['classid'+i] = id;
      i++;
    });
    obj.class_count = obj.classIds.length;
  }
  obj.path = '/ISteamEconomy/GetAssetClassInfo/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getPlayerAchievements = function(obj) {
  var obj = this.normalizeAppGameId(obj);
  if (!this.validate(obj, 'getPlayerAchievements')) return false;
  obj.path = '/ISteamUserStats/GetPlayerAchievements/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getRecentlyPlayedGames = function(obj) {
   if (!this.validate(obj, 'getRecentlyPlayedGames')) return false;
  obj.path = '/IPlayerService/GetRecentlyPlayedGames/v0001/?';
  this.makeRequest(obj);
}
steam.prototype.getUserStatsForGame = function(obj) {
  if(!this.validate(obj, 'getUserStatsForGame')) return false;
  obj.path = '/ISteamUserStats/GetUserStatsForGame/v0002/?';
  this.makeRequest(obj);
}


//internal used to validate an object to send to an api request, could also be used
//by the user if they need to verify the validity of data submitted from an outside source
//the callback is passed two arguments, such:  callback(err, data)
steam.prototype.validate = function(obj, method) {
  var error;
  if (!obj) throw new Error('no arguments passed');
  //if the user doesn't pass a callback, it makes no sense
  if (typeof obj.callback != 'function') throw new Error('invalid callback');
  
  switch(method) {
    case 'getNewsForApp':
      if ( typeof obj.appid != 'string' && typeof obj.appid != 'number') error = ('invalid appid');
      if ( typeof obj.count != 'string' && typeof obj.count != 'number') error = ('invalid count');
      if ( typeof obj.maxlength != 'string' && typeof obj.maxlength != 'number') error = ('invalid maxlength');
      break;
    case 'getGlobalAchievementPercentagesForApp':
      if ( typeof obj.gameid != 'string' && typeof obj.gameid != 'number') error = ('invalid gameid');
      break;
    case 'getPlayerSummaries':
      if (!obj.steamids) {
        error = ('invalid steamids');
      }
      if (typeof obj.steamids == 'object' && !obj.steamids.length) {
        error = ('getPlayerSummaries steamids only accepts a string or array of strings');
      }
      if (typeof obj.steamids == 'object' && obj.steamids.length > 100) error = ('too many steamids');
      break;
    case 'getFriendList':
      if (!obj.steamid) {
        error = 'invalid steamid';
      }
      break;
    case 'getSchema':
      if (!obj.gameid || (typeof obj.gameid != 'string' && typeof obj.gameid != 'number')) {
        error = ('invalid gameid');
      }
      break;
    case 'getPlayerItems':
      if (!obj.gameid || (typeof obj.gameid != 'string' && typeof obj.gameid != 'number')) {
        error = ('invalid gameid');
      }
      if (typeof obj.steamid != 'string') {
        error = ('getPlayerItems steamid argument only accepts a string');
      }
      break;
    case 'getOwnedGames':
      if (!obj.steamid) {
        error = 'invalid steamid';
      }
      break;
    case 'getAssetPrices':
      if (!obj.appid || (typeof obj.appid != 'string' && typeof obj.appid != 'number')) {
        error = ('invalid gameid');
      }
      break;
    case 'getAssetClassInfo':
      if (!obj.appid || (typeof obj.appid != 'string' && typeof obj.appid != 'number')) {
        error = ('invalid gameid');
      }
      if (obj.classIds && !obj.class_count && !obj.classIds.length) {
        error = ('classIds convenience property must be array of numbers or strings');
      }
      break;
    case 'getPlayerAchievements':
      if (!obj.appid || (typeof obj.appid != 'string' && typeof obj.appid != 'number')) {
        error = ('invalid gameid');
      }
      if (!obj.steamid || (typeof obj.steamid != 'string' && typeof obj.steamid != 'number')) {
        error = ('invalid steamid');
      }
      if (obj.l && typeof obj.l != 'string') {
        error = ('invalid language');
      }
      break;
      case 'getRecentlyPlayedGames':
        if (!obj.steamid) {
          error = 'invalid steamid';
        }
      break;
      case 'getUserStatsForGame':
        if (!obj.appid || (typeof obj.appid != 'string' && typeof obj.appid != 'number')) {
          error = ('invalid appid');
        }
        if(!obj.steamid || (typeof obj.steamid != 'string' && typeof obj.steamid != 'number')) {
          error ('invalid steamid');
        }
      break;
  }
  if (error) {
    obj.callback(error);
    return false;
  }
  return true;
}

//some of the newer methods use an appid key instead of a gameid key.  This normalizes.
steam.prototype.normalizeAppGameId = function(obj) {
  if (obj.appid && !obj.gameid) {
    obj.gameid = obj.appid;
  }
  if (obj.gameid && !obj.appid) {
    obj.appid = obj.gameid;
  }
  return obj;
}


//internal method used to actually make the request to the steam servers
steam.prototype.makeRequest = function(obj) {
  var err;
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
      //TODO Use response code from headers instead
      if (resData.indexOf('404 Not Found') != -1) {
        callback('error returned from steam API');
        return;
      }
      if (resData.indexOf('401 Unauthorized') != -1) {
        callback('invalid API key');
        return;
      }
      if (format == 'json') resData = JSON.parse(resData);
      
      if (  typeof resData.result != 'undefined' && 
            typeof resData.result.status != 'undefined' &&
            resData.result.status != 1) {
        callback(resData);
        return;
      }
      callback(err,resData);
    })
  }).on('error', function(error) {
    callback(error);
  })

}
module.exports = steam;
