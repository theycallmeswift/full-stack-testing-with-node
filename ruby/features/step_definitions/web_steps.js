var assert = require('assert');

function WebSteps() {
  this.World = require("../support/world.js").World;

  this.When('I visit the home page', function(next) {
    var self = this;

    self.visit(self.root, next);
  });

  this.Then(/^I should (not )?see "([^"]*)"$/, function(neg, text, next) {
    var body = this.browser.html('body');
    if(neg) {
      assert(body.indexOf(text) === -1, "Expected body not to contain '" + text + "'");
    } else {
      assert(body.indexOf(text) !== -1, "Expected body to contain '" + text + "'");
    }
    next();
  });

  this.Given('the following users exist:', function(table, next) {
      var self = this
        , users = table.hashes();

      self.browser.visit(self.root, function() {
        self.async.forEach(users, function(user, cb) {
          var keys = Object.keys(user);

          for(var i = 0; i < keys.length; i++) {
            self.browser.fill(keys[i], user[keys[i]]);
          }

          self.browser.pressButton("#submit", cb);
        }, next);
      });
  });

  this.Before(function(callback) {
    var self = this;

    self.request(self.root + '/api/users', function(err, res, body) {
      var users = JSON.parse(body);

      self.async.forEach(users, function(user, cb) {
        self.request.post(self.root + '/api/users/' + user.id, cb);
      }, callback);
    });
  });
};

module.exports = WebSteps;
