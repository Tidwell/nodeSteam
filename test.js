var assert = require('assert');
var steam = require('./app');

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
    apiKey: '9FE25C516BE06DE9CBA1511C6EF0F1AD',
    format: 'qwe'
  }); 
}, Error, 'Incorrect format did not throw error');
//invalid format data type
assert.throws(function() {
  var q = new steam({
    apiKey: '9FE25C516BE06DE9CBA1511C6EF0F1AD',
    format: ['qwe', 'asdf']
  }); 
}, Error, 'Incorrect format data type did not throw error');


var s = new steam({
  apiKey: '9FE25C516BE06DE9CBA1511C6EF0F1AD',
});
//invalid getNewsForApp
assert.throws(function() {
  s.getNewsForApp({
    count: 3,
    maxlength: 300,
    callback: function(data) {
    }
  })
}, Error, 'Incorrect appid to getNewsForApp did not throw error');
assert.throws(function() {
  s.getNewsForApp({
    appid: 400,
    maxlength: 300,
    callback: function(data) {
    }
  })
}, Error, 'Incorrect count to getNewsForApp did not throw error');
assert.throws(function() {
  s.getNewsForApp({
    appid: 400,
    count: 300,
    callback: function(data) {
    }
  })
}, Error, 'Incorrect maxlength to getNewsForApp did not throw error');

//invalid getGlobalAchievementPercentagesForApp
assert.throws(function() {
  s.getGlobalAchievementPercentagesForApp({
    callback: function(data) {
    }
  })
}, Error, 'Incorrect gameid to getGlobalAchievementPercentagesForApp did not throw error');

//invalid getPlayerSummaries
assert.throws(function() {
  s.getPlayerSummaries({
    callback: function(data) {
    }
  })
}, Error, 'Incorrect steamids to getGlobalAchievementPercentagesForApp did not throw error');
assert.throws(function() {
  s.getPlayerSummaries({
    callback: function(data) {
    },
    steamids: {}
  })
}, Error, 'Incorrect steamids to getGlobalAchievementPercentagesForApp did not throw error');

//invalid getSchema
assert.throws(function() {
  s.getSchema({
    callback: function(data) {
    },
    gameid: []
  })
}, Error, 'Incorrect gameid to getSchema did not throw error');

//invalid getPlayerItems
assert.throws(function() {
  s.getPlayerItems({
    callback: function(data) {
    },
    gameid: [],
    steamid: '76561197960435530'
  })
}, Error, 'Incorrect gameid to getPlayerItems did not throw error');
assert.throws(function() {
  s.getPlayerItems({
    callback: function(data) {
    },
    gameid: 440,
    steamid: ['']
  })
}, Error, 'Incorrect steamid to getPlayerItems did not throw error');


/*Correctly implimented*/
assert.doesNotThrow(function() {
  var s = new steam({
    apiKey: '9FE25C516BE06DE9CBA1511C6EF0F1AD',
  });
  s.getNewsForApp({
    appid: 440,
    count: 3,
    maxlength: 300,
    callback: function(data) {
      assert.ok(data, 'No data returned from getNewsForApp');
    }
  })
  s.getGlobalAchievementPercentagesForApp({
    callback: function(data) {
      assert.ok(data, 'No data returned for getGlobalAchievementPercentagesForApp');
    },
    gameid: 440
  });
  s.getPlayerSummaries({
    callback: function(data) {
      assert.ok(data, 'No data returned for getPlayerSummaries');
    },
    steamids: ['76561198037414410', '76561197960435530']  //ids have to be strings
  })
  s.getSchema({
    gameid: 440,
    callback: function(data) {
      assert.ok(data, 'No data returned for getSchma');
    }
  })
  s.getPlayerItems({
    gameid: 440,
    callback: function(data) {
      assert.ok(data, 'No data returned for getPlayerItems');
    },
    steamid: '76561197960435530'
  })
},Error, 'Failed during correct implimentation');