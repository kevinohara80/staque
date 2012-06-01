var async = require('async');

var Staque = function(opts) {
  this._queues = {}
  this._concurrency = opts.concurrency || 1;
  this._job = opts.job;
  this._delay = opts.delay || 0; 
}

// returns the current stats about a sub queue, or all of them
Staque.prototype.stat = function(sq, cb) {
  if(!cb) cb = sq;
  var self = this;
  var stat = {}
  if(self._queues) {
    for(var key in self._queues) {
      
    }
  }
  cb(null, stat);
}

module.exports.create = function(opts) {
  if(!opts) opts = {}
  return new Staque(opts);
}

module.exports.version = '0.0.1';