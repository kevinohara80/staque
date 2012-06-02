var test = require('tap').test
var staque = require('../');

var opts = {
  job: function(task, callback) {
    if(!task.count) task.count = 1;
    task.count++;
    callback();
  }
}

test('stat shoud return an object in callback', function(t){
  var queue = staque.create(opts);
  queue.stat(function(err,stat) {
    t.equal(err, null, 'error should be null');
    t.equal(typeof stat, 'object', 'stat should be an object');
    t.end();
  });
});