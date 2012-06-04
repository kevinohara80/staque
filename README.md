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

***staque*** also provides sub-queuing. This is useful if you are doing something like queueing jobs by client. Each sub-queue acts independently. To load a job into a sub-queue, just provide a sub-queue key.

Note: Not providing a sub-queue just puts your job in a queue called `_default`.

```js
queue.load('client1', 'foo', function(err) {
  if(!err) console.log('queued a job in a sub-queue');
});

queue.load('bar', function(err) {
  if(!err) console.log('queued a job in the _default queue');
});
```

You can request the status of your queues with the `stat()` call. The call will return an array of the queues, current jobs, and other data.

```js
queue.stat(function(err,stat) {
  if(!err) console.log(stat);
});
```



