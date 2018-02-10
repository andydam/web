const methods = require('../methods');

const handler = async (request, response) => {
  switch (request.method) {
    case 'GET':
      methods.handlers.get(request, response);
      break;
    case 'POST':
      methods.handlers.post(request, response);
      break;
    default:
      response.writeHead(500);
      response.end();
  }
};

module.exports = handler;
