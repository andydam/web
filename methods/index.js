const Method = require('./method');

const get = new Method();
const post = new Method();

module.exports = {
  methods: {
    get: get.method.bind(get),
    post: post.method.bind(post),
    _getHandlers: get.handlers,
    _postHandlers: post.handers,
  },
  handlers: {
    get: get.handler.bind(get),
    post: post.handler.bind(post),
  },
};
