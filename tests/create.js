var test = require('tap').test
var staque = require('../');

var opts = {
  job: function(task, callback) {
    if(!task.count) task.count = 1;
    task.count++;
    callback();
  }, 
  concurrency: 3,
  delay: 500
}

test('should set the job on create', function(t) {
  var queue = staque.create(opts);
  t.equal(queue._job !== null, true, 'job should exist');
  t.equal(typeof queue._job, 'function', 'job should be a function');
  t.end();
});

test('should set the concurrency on create', function(t) {
  var queue = staque.create(opts);
  t.equal(queue._concurrency !== null, true, 'concurrency should exist');
  t.equal(typeof queue._concurrency, 'number', 'concurrency should be a number');
  t.end();
});

test('should set the delay on create', function(t) {
  var queue = staque.create(opts);
  t.equal(queue._delay !== null, true, 'delay should exist');
  t.equal(typeof queue._delay, 'number', 'delay should be a number');
  t.end();
});