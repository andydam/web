const server = require('./server');
const router = require('./router');

module.exports = {
  server: () => server(),
  router: () => router(),
};
