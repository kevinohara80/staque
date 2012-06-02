var test = require('tap').test
var staque = require('../');

test('check the version', function(t){
  t.equal(staque.version !== null, true, 'check for existence of version');
  t.end();
});