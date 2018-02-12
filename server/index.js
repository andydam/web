const http = require('http');

const router = require('../router');

const web = () => {
  const httpRouter = router();

  const httpServer = Object.assign(http.createServer(httpRouter), {
    get: (...args) => httpRouter.get(...args),
    post: (...args) => httpRouter.post(...args),
    _getHandlers: httpRouter._getHandlers,
    _postHandlers: httpRouter._postHandlers,
  });

  return httpServer;
};

module.exports = web;
