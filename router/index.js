const http = require('http');

const Method = require('../methods/method');
const PostMethod = require('../methods/post');

const router = () => {
  const use = new Method();
  const get = new Method();
  const post = new PostMethod();

  const responseHandler = function responseHandler(request, response) {
    if (request instanceof http.IncomingMessage) {
      use.handler(request, response);
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
    } else {
      throw new SyntaxError(
        'routers are only supposed to be used as http request listeners!',
      );
    }
  };

  responseHandler.use = use.method.bind(use);
  responseHandler.get = get.method.bind(get);
  responseHandler.post = post.method.bind(post);

  responseHandler._useHandlers = use.handlers;
  responseHandler._getHandlers = get.handlers;
  responseHandler._postHandlers = post.handlers;

  return responseHandler;
};

module.exports = router;
