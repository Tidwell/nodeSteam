var assert = require('chai').assert;
var Steam = require('../lib/steam');

describe('Method object validation', function() {
  var s = {};
  s = new Steam({
    apiKey: 'somefakekey',
    format: 'json'
  });

  describe('GetNewsForApp', function() {
    it('no appid should throw', function() {
      assert.throws(function() {
        s.getNewsForApp({
          count: 3,
          maxlength: 300,
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });

    it('no count should throw', function() {
      assert.throws(function() {
        s.getNewsForApp({
          appid: 400,
          maxlength: 300,
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });

    it('no maxlength should throw', function() {
      assert.throws(function() {
        s.getNewsForApp({
          appid: 400,
          count: 20,
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
  });

  describe('GetGlobalAchievementPercentagesForApp', function() {
    it('no appid should throw', function() {
      assert.throws(function() {
        s.getGlobalAchievementPercentagesForApp({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
  });

  describe('GetPlayerSummaries', function() {
    it('no steamids should throw', function() {
      assert.throws(function() {
        s.getPlayerSummaries({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
    it('bad steamids should throw', function() {
      assert.throws(function() {
        s.getPlayerSummaries({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          steamids: {}
        });
      });
    });
  });

  describe('GetSchema', function() {
    it('no appid should throw', function() {
      assert.throws(function() {
        s.getSchema({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: []
        });
      });
    });
  });

  describe('GetPlayerItems', function() {
    it('no appid should throw', function() {
      assert.throws(function() {
        s.getPlayerItems({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: [],
          steamid: '76561197960435530'
        });
      });
    });
    it('no steamids should throw', function() {
      assert.throws(function() {
        s.getPlayerItems({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: 440,
          steamid: {}
        });
      });
    });
    it('bad steamids should not throw', function() {
      assert.doesNotThrow(function() {
        s.getPlayerItems({
          appid: 440,
          steamid: '76123131232313123112',
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
  });

  describe('GetPlayerAchievements', function() {
    it('no appid should throw', function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: [],
          steamid: '76561197960435530'
        });
      });
    });
    it('no steamids should throw', function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: 440,
          steamid: ['']
        });
      });
    });
    it('bad language should throw', function() {
      assert.throws(function() {
        s.getPlayerAchievements({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          },
          gameid: 440,
          steamid: '76561197960435530',
          l: ['']
        });
      });
    });
  });

  describe('GetRecentlyPlayedGames', function() {
    it('no steamids should throw', function() {
      assert.throws(function() {
        s.getRecentlyPlayedGames({
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
  });

  describe('GetServersAtAddress', function() {
    it('invalid ip address should throw', function() {
      assert.throws(function() {
        s.getServersAtAddress({
          addr: '1.2.3',
          callback: function(err, data) {
            if (err) {
              throw new Error(err);
            }
          }
        });
      });
    });
  });

});
