const Method = require('./method');

module.exports = class Post extends Method {
  constructor() {
    super();
  }
  async handler(request, response) {
    let requestData = '';

    request.on('data', (data) => (requestData += data));

    request.on('end', () => {
      super.handler({ ...request, body: requestData }, response);
    });
  }
};
