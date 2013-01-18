var zombie = require('zombie')
  , async = require('async')
  , request = require('request');

function World(callback) {
  this.browser = new zombie.Browser();
  this.root = "http://localhost:8080";
  this.request = request;
  this.async = async;

  callback();
};

World.prototype.visit = function(url, callback) {
  this.browser.visit(url, callback);
};

exports.World = World;
