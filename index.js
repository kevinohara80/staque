var async = require('async');

var Staque = function(opts) {
  
  this._queues = {}
  this._concurrency = (opts.concurrency && opts.concurrency > 1) ? opts.concurrency : 1; 
  this._delay = (opts.delay && opts.delay >= 0) ? opts.delay : 0;
  
  var self = this;
  
  if(this._delay > 0) {
    this._job = function(task, cb) {
      setTimeout(function() { opts.job(task, cb); }, self._delay);
    }
  } else {
    this._job = opts.job;
  }
  
}

// returns the current stats about a sub queue, or all of them
Staque.prototype.stat = function(sq, cb) {
  if(!cb) cb = sq;
  var self = this;
  var stat = [];
  if(self._queues) {
    for(var key in self._queues) {
      var queue = {
        name: key,
        length: self._queues[key].length(),
        delay: self._delay
      }
      stat.push(queue);
    }
  }
  cb(null, stat);
}

// load up a task into the queue
Staque.prototype.load = function(task, sq, cb) {
  
  var args = Array.prototype.slice.call(arguments);  
  var self = this; 
   
  if(arguments.length === 2) {
    if(typeof args[1] === 'function') {
      cb = args[1];
      sq = null;
    } else {
      sq = args[1];
      cb = null;
    }
  } 
  
  var q;
  
  // check to see if we need a subqueue
  if(!sq) {
    if(!self._queues._default) {
      self._queues._default = q = async.queue(self._job, self._concurrency);
    } else {
      q = self._queues._default;
    }
  } else if(!self._queues[sq]) {
    self._queues[sq] = q = async.queue(self._job, self._concurrency);
  } else {
    q = self._queues[sq];
  }
  
  q.push(task);
  if(cb) cb();
}

module.exports.create = function(opts) {
  if(!opts) opts = {}
  return new Staque(opts);
}

module.exports.version = '0.0.3';