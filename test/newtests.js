var assert = require("chai").assert;
var Steam = require("../lib/steam");

var APIKEY = require('./key.js');
if (APIKEY === 'xxxxxx') { throw new  Error('Must provide key in ./test/key.js'); }

describe("Steam instance creator", function() {
  it("constructing with no options should throw", function() {
    assert.throws(function() {
      var q = new Steam();
    });
  });
  it("constructing with a bad API key format should throw", function() {
    assert.throws(function() {
      var q = new Steam({
        apiKey: ["some", "bad", "type"],
        format: "json"
      });
    });
  });
  it("constructing with a bad format should throw", function() {
    assert.throws(function() {
      var q = new Steam({
        apiKey: "XXX",
        format: "badformat"
      });
    });
  });
  it("constructing with no format should default to json", function() {
    var q = new Steam({
      apiKey: "XXX"
    });
    assert.equal(q.format, "json");
  });
});

describe("Method object validation", function() {
  var s = {};
  s = new Steam({
    apiKey: APIKEY,
    format: "json"
  });

  describe("GetNewsForApp", function() {
    it("no appid should throw", function() {
      assert.throws(function() {
        s.getNewsForApp({
          count: 3,
          maxlength: 300,
          callback: function(err, data) {
            if (err) throw new Error(err);
          }
        });
      });
    });

    it("no count should throw", function() {
      assert.throws(function() {
        s.getNewsForApp({
          appid: 400,
          maxlength: 300,
          callback: function(err, data) {
            if (err) throw new Error(err);
          }
        });
      });
    });

    it("no maxlength should throw", function() {
      assert.throws(function() {
        s.getNewsForApp({
          appid: 400,
          count: 20,
          callback: function(err, data) {
            if (err) throw new Error(err);
          }
        });
      });
    });
  });

  describe("GetGlobalAchievementPercentagesForApp", function() {
    it("no appid should throw", function() {
      assert.throws(function() {
        s.getGlobalAchievementPercentagesForApp({
          callback: function(err,data) {
            if (err) throw new Error(err);
          }
        });
      });
    });
  });

  describe("GetPlayerSummaries", function() {
    it("no steamids should throw", function() {
      assert.throws(function() {
        s.getPlayerSummaries({
          callback: function(err, data) {
            if (err) throw new Error(err);
          }
        });
      });
    });
    it("bad steamids should throw", function() {
      assert.throws(function() {
        s.getPlayerSummaries({
          callback: function(err, data) {
            if (err) throw new Error(err);
          },
          steamids: {}
        });
      });
    });
  });

  describe("GetSchema", function() {
    it("no appid should throw", function() {
      assert.throws(function() {
        s.getSchema({
          callback: function(err, data) {
            if (err) throw new Error(err);
          },
          gameid: []
        });
      });
    });
  });

  describe("GetPlayerItems", function() {
    it("no appid should throw", function() {
      assert.throws(function() {
        s.getPlayerItems({
          callback: function(err,data) {
            if (err) throw new Error(err);
          },
          gameid: [],
          steamid: '76561197960435530'
        });
      });
    });
    it("no steamids should throw", function() {
      assert.throws(function() {
        s.getPlayerItems({
          callback: function(err,data) {
            if (err) throw new Error(err);
          },
          gameid: 440,
          steamid: ['']
        });
      });
    });
    it("bad steamids should not throw", function() {
      assert.doesNotThrow(function() {
        s.getPlayerItems({
          gameid: 440,
          callback: function(err,data) {
            //if (err) throw new Error(err);
          },
          steamid: '765611979ffffff60435530'
        });
      });
    });
  });

  describe("GetPlayerAchievements", function() {
    it("no appid should throw", function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err,data) {
            if (err) throw new Error(err);
          },
          gameid: [],
          steamid: '76561197960435530'
        });
      });
    });
    it("no steamids should throw", function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err,data) {
            if (err) throw new Error(err);
          },
          gameid: 440,
          steamid: ['']
        });
      });
    });
    it("bad language should throw", function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err,data) {
            if (err) throw new Error(err);
          },
          gameid: 440,
          steamid: '76561197960435530',
          l: ['']
        });
      });
    });
  });

  describe("GetRecentlyPlayedGames", function() {
    it("no steamids should throw", function() {
      assert.throws(function() {
        s.getRecentlyPlayedGames({
          callback: function(err,data) {
            if (err) throw new Error(err);
          }
        });
      });
    });
  });

});

describe("Request handling", function() {

  it("passing an invalid API key should not throw when request is made", function() {
    var s = new Steam({
      apiKey: "somebadkey",
      format: "json"
    });
    assert.doesNotThrow(function() {
      s.getPlayerSummaries({
        callback: function(err,data) {},
        steamids: ['76561198037414410', '76561197960435530']
      });
    });
  });

});

describe("Successful Data Return", function() {
  var s = {};
  s = new Steam({
    apiKey: APIKEY,
    format: "json"
  });

  it("GetNewsForApp", function(done) {
    s.getNewsForApp({
      appid: 440,
      count: 3,
      maxlength: 300,
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });

  it("GetGlobalAchievementPercentagesForApp", function(done) {
    s.getGlobalAchievementPercentagesForApp({
      appid: 440,
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });

  it("GetPlayerSummaries", function(done) {
    s.getPlayerSummaries({
      steamids: ['76561198037414410', '76561197960435530'],
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });

  it("GetFriendList", function(done) {
    s.getFriendList({
      steamid: '76561197960435530',
      relationship: 'all',
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });

  it("GetSchema", function(done) {
    s.getSchema({
      gameid: 440,
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });

  it("GetPlayerItems", function(done) {
    s.getPlayerItems({
      appid: 440,
      steamid: '76561197993520601',
      callback: function(err, data) { check(done, function() {
        if (err) return err;
        assert.isObject(data, "Data is not an object");
      }); }
    });
  });
});

/* TEMPLATE:
it("", function(done) {
  s.something({
    callback: function(err, data) { check(done, function() {
      if (err) return err;
      assert.isObject(data, "Data is not an object");
    }); }
  });
});
*/

function check( done, f ) {
  try {
    var x = f();
    if (x) done(new Error(x));
    else done();
  } catch( e ) {
    done(e);
  }
}
