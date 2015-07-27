/*
  UPDATE KEY.JS FOR TESTING
*/
var apiKey = require('./key.js');
if (apiKey === 'xxxxxx') { throw new  Error('Must provide key in ./test/key.js'); }

var assert = require('assert');
var steam = require('../lib/steam');

//forgetting to pass in apiKey
assert.throws(function() {
  var q = new steam(); 
}, Error, 'Incorrect construction did not throw error');
//passing in somethign that isn't a string as an apiKey
assert.throws(function() {
  var q = new steam({
    apiKey: ['asdf', 'asdf'],
    format: 'json'
  }); 
}, Error, 'Incorrect apiKey data type did not throw error');

//invalid format
assert.throws(function() {
  var q = new steam({ 
    apiKey: 'XXXX',
    format: 'qwe'
  }); 
}, Error, 'Incorrect format did not throw error');
//invalid format data type
assert.throws(function() {
  var q = new steam({
    apiKey: 'XXXX',
    format: ['qwe', 'asdf']
  }); 
}, Error, 'Incorrect format data type did not throw error');


var s = new steam({
  apiKey: apiKey,
});
//invalid getNewsForApp
assert.throws(function() {
  s.getNewsForApp({
    count: 3,
    maxlength: 300,
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'Incorrect appid to getNewsForApp did not throw error');
assert.throws(function() {
  s.getNewsForApp({
    appid: 400,
    maxlength: 300,
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'Incorrect count to getNewsForApp did not throw error');
assert.throws(function() {
  s.getNewsForApp({
    appid: 400,
    count: 300,
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'Incorrect maxlength to getNewsForApp did not throw error');

//invalid getGlobalAchievementPercentagesForApp
assert.throws(function() {
  s.getGlobalAchievementPercentagesForApp({
    callback: function(err,data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'Incorrect gameid to getGlobalAchievementPercentagesForApp did not throw error');

//invalid getPlayerSummaries
assert.throws(function() {
  s.getPlayerSummaries({
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'Incorrect steamids to getGlobalAchievementPercentagesForApp did not throw error');
assert.throws(function() {
  s.getPlayerSummaries({
    callback: function(err, data) {
      if (err) throw new Error(err);
    },
    steamids: {}
  })
}, Error, 'Incorrect steamids to getGlobalAchievementPercentagesForApp did not throw error');

//invalid getSchema
assert.throws(function() {
  s.getSchema({
    callback: function(err, data) {
      if (err) throw new Error(err);
    },
    gameid: []
  })
}, Error, 'Incorrect gameid to getSchema did not throw error');

//invalid getPlayerItems
assert.throws(function() {
  s.getPlayerItems({
    callback: function(err,data) {
      if (err) throw new Error(err);
    },
    gameid: [],
    steamid: '76561197960435530'
  })
}, Error, 'Incorrect gameid to getPlayerItems did not throw error');
assert.throws(function() {
  s.getPlayerItems({
    callback: function(err,data) {
      if (err) throw new Error(err);
    },
    gameid: 440,
    steamid: ['']
  })
}, Error, 'Incorrect steamid to getPlayerItems did not throw error');

s.getPlayerItems({
  gameid: 440,
  callback: function(err,data) {
     if (!err) throw new Error('getPlayerItems with a bad steamid did not return an error');
  },
  steamid: '765611979ffffff60435530'
})

//invalid getPlayerAchievements
assert.throws(function() {
  s.getPlayerAchievements({
    callback: function(err,data) {
      if (err) throw new Error(err);
    },
    gameid: [],
    steamid: '76561197960435530'
  })
}, Error, 'Incorrect gameid to getPlayerAchievements did not throw error');
assert.throws(function() {
  s.getPlayerAchievements({
    callback: function(err,data) {
      if (err) throw new Error(err);
    },
    gameid: 440,
    steamid: ['']
  })
}, Error, 'Incorrect steamid to getPlayerAchievements did not throw error');
assert.throws(function() {
  s.getPlayerAchievements({
    callback: function(err,data) {
      if (err) throw new Error(err);
    },
    gameid: 440,
    steamid: '76561197960435530',
    l: ['']
  })
}, Error, 'Incorrect language to getPlayerAchievements did not throw error');
assert.throws(function() {
  s.getRecentlyPlayedGames({
    callback: function(err,data) {
      if (err) throw new Error(err);
    }
  })
}, Error, 'No steamid to getRecentlyPlayedGames did not throw error');

/*Correctly implimented*/
assert.doesNotThrow(function() {
  s.getNewsForApp({
    appid: 440,
    count: 3,
    maxlength: 300,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned from getNewsForApp');
    }
  })
  s.getGlobalAchievementPercentagesForApp({
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getGlobalAchievementPercentagesForApp');
    },
    gameid: 440
  });
  s.getPlayerSummaries({
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getPlayerSummaries');
    },
    steamids: ['76561198037414410', '76561197960435530']  //ids have to be strings
  })
  s.getFriendList({
    steamid: '76561197960435530',  //ids have to be strings
    relationship: 'all', //all or friend
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getPlayerSummaries');
    },
  })
  s.getSchema({
    gameid: 440,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getSchma');
    }
  })
  s.getPlayerItems({
    gameid: 440,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getPlayerItems');
    },
    steamid: '76561197993520601'
  })
  s.getAssetPrices({
    appid: 440,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getAssetPrices');
    }
  })
  s.getAssetClassInfo({
    appid: 440,
    classid0: '16891096',
    class_count: 1,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getAssetClassInfo');
    }
  })
  s.getAssetClassInfo({
    gameid: 440, //testing normalization
    classid0: '16891096',
    class_count: 1,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getAssetClassInfo');
    }
  })
  s.getAssetClassInfo({
    appid: 440, 
    classIds: ['16891096',156],//testing convenience property
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getAssetClassInfo');
    }
  })
  s.getPlayerAchievements({
    gameid: 440,
    steamid: '76561197960435530',
    l: 'en',
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getPlayerItems');
    }
  })
  s.getRecentlyPlayedGames({
    steamid: '76561197960435530',
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getRecentlyPlayedGames');
    }
  })
  s.getUserStatsForGame({
    steamid: '76561197963506690',
    appid: 730,
    callback: function(err,data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned for getUserStatsForGame');
    }
  })


},Error, 'Failed during correct implimentation');
