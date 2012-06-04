staque
======

build multiple, on-the-fly synchronous job queues

## Usage

```bash
$ npm install staque
```

Create a new job queue and load a job.

```js
var queue = staque.create({
  job: function(task, cb) {
    console.log(task);
    cb();
  }, 
  delay: 100,
  concurrency: 0
});

queue.load('blah', function(err) {
  if(!err) console.log('queued a job');
});

```