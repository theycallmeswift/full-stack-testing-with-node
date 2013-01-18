var assert = require('assert');

function WebSteps() {
  this.World = require("../support/world.js").World;

  this.When('I visit the home page', function(next) {
    var self = this;

    self.visit(self.root, next);
  });

  this.Then('I should see "$text"', function(text, next) {
    var body = this.browser.html('body');
    assert(body.indexOf(text) !== -1, "Expected body to contain '" + text + "'");
    next();
  });

  this.When('I click "$text"', function(text, next) {
    this.browser.clickLink(text, next);
  });

  this.Then('I should be on the "$uri" page', function(uri, next) {
    var currentUrl = this.browser.window.location.href
      , expectedUrl = this.root + uri;

    assert.equal(currentUrl, expectedUrl);
    next();
  });
};

module.exports = WebSteps;
