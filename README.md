# web

[![Build Status](https://travis-ci.org/andydam/web.svg?branch=master)](https://travis-ci.org/andydam/web)

an extremely lightweight node web application framework

```js
const web = require('web');
const webApp = web.server();

webApp.get('/', (req, res) => {
  res.end('Hello World');
});

webApp.listen(3000);
```

# Table of Contents

1.  [Installation](#installation)
1.  [Features](#features)
1.  [Benchmarks](#benchmarks)
1.  [Requirements](#requirements)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install andydam/web
```

## Features

1.  [Router](#router)
1.  [Route Params](#route-params)
1.  [POST Request Body](#post-request-body)
1.  [Everything Else](#everything-else)

#### Router

```js
const webRouter = web.router();

webRouter.get('/', (req, res) => {
  res.end('Hello World from Router');
});

webApp.use(webRouter);
```

#### Route Params

```js
webServer.get('/some/path/:dynamic', (req, res) => {
  res.end('Dynamic end point is ' + req.params.dynamic);
});
```

_web only has support for one param at the end of static path_

#### POST Request Body

```js
webServer.post('/somePoint', (req, res) => {
  res.end('POST data is ' + req.body);
});
```

#### Everything Else

That's it! web only comes with extremely limited features, extending upon node's http module. This means that the request and response objects are node's http [IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) and [ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) objects.

## Benchmarks

Using [hbakhtiyor's node frameworks benchmark](https://github.com/hbakhtiyor/node-frameworks-benchmark)

```
Simple HTTP benchmark results (wrk) with close connection

47372.89 Requests/sec - ukoa.js
35548.17 Requests/sec - ufeathers.js
*** 31403.07 Requests/sec - web.js ***
29583.14 Requests/sec - uexpress.js
555.82 Requests/sec - restify.js
551.59 Requests/sec - rawnode.js
550.16 Requests/sec - express.js
549.61 Requests/sec - hapi.js
549.23 Requests/sec - total/total.js
548.67 Requests/sec - koa.js
548.29 Requests/sec - feathers.js
546.58 Requests/sec - micro.js
173.34 Requests/sec - uws.js
```

## Requirements

* Node 9.4
