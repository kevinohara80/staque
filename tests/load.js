var test = require('tap').test
var staque = require('../');

var opts = {
  job: function(task, cb) {
    cb();
  }, 
  delay: 100
}

test('task with no subqueue should go to default', function(t){
  var queue = staque.create(opts);
  queue.load('blah', function() {
    queue.stat(function(err, stat) {
      t.equal(stat[0].length, 1, 'default should have length 1');
      t.end();
    });
  });
});

test('should create multiple queues', function(t){
  var queue = staque.create(opts);
  queue.load('blah', function() { });
  queue.load('blah', 'queue1', function() { });
  queue.load('blah', 'queue2', function() { });
  queue.stat(function(err, stat) {
    t.equal(stat.length, 3, 'should have 3 unique queues');
    t.end();
  });
});

test('should not duplicate queues with same key', function(t){
  var queue = staque.create(opts);
  queue.load('blah', function() { }); // should be default queue
  queue.load('foo', function() { }); // should be default queue
  queue.load('hello', 'queue1', function() { });
  queue.load('test', 'queue1', function() { });
  queue.stat(function(err, stat) {
    t.equal(stat.length, 2, 'should have only 2 queues');
    t.end();
  });
});

test('callbacks should be optional', function(t){
  var queue = staque.create(opts);
  queue.load('blah', function() {});
  queue.load('another');
  queue.load('yetanother', 'subqueue1');
  t.end();
});

test('callbacks should fire', function(t){
  var queue = staque.create(opts);
  queue.load('blah', function(err) {
    t.end();
  });
});
