var test = require("tap").test
var staque = require('../');

test('stat shoud return an object in callback', function(t){
  var queue = staque.create();
  queue.stat(function(err,stat) {
    t.equal(err, null, 'error should be null');
    t.equal(typeof stat, 'object', 'stat should be an object');
    t.end();
  });
});