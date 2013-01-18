var zombie = require('zombie');

function World(callback) {
  this.browser = new zombie.Browser();
  this.root = "http://localhost:8080";
  callback();
};

World.prototype.visit = function(url, callback) {
  this.browser.visit(url, callback);
};

exports.World = World;
