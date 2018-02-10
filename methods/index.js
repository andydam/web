const Method = require('./method');
const PostMethod = require('./post');

const get = new Method();
const post = new PostMethod();

module.exports = {
  methods: {
    get: get.method.bind(get),
    post: post.method.bind(post),
    _getHandlers: get.handlers,
    _postHandlers: post.handlers,
  },
  handlers: {
    get: get.handler.bind(get),
    post: post.handler.bind(post),
  },
};
