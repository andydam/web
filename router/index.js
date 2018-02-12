const Method = require('../methods/method');
const PostMethod = require('../methods/post');

const router = () => {
  const get = new Method();
  const post = new PostMethod();

  const responseHandler = function responseHandler(request, response) {
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
  };

  responseHandler.get = get.method.bind(get);
  responseHandler.post = post.method.bind(post);

  responseHandler._getHandlers = get.handlers;
  responseHandler._postHandlers = post.handlers;

  return responseHandler;
};

module.exports = router;
