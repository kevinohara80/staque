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
      t.equal(stat._default.length, 1, 'default should have length 1');
      t.end();
    });
  });
  
});