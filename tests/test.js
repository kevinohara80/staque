var staque = require('../');
var test = require("tap").test

test('check the thing', function(t){
  t.equal(staque.version !== null, true, 'check for existence of version');
  t.end();
});