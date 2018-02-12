const http = require('http');

const Method = require('../methods/method');
const PostMethod = require('../methods/post');

const web = () => {
  const get = new Method();
  const post = new PostMethod();

  const httpServer = Object.assign(
    http.createServer((request, response) => {
      switch (request.method) {
        case 'GET':
          get.handler(request, response);
          break;
        case 'POST':
          post.handler(request, response);
          break;
        default:
          response.writeHead(500);
          response.end();
      }
    }),
    {
      get: (...args) => get.method(...args),
      post: (...args) => post.method(...args),
      _getHandlers: get.handlers,
      _postHandlers: post.handlers,
    },
  );

  return httpServer;
};

module.exports = web;
