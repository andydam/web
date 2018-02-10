const { expect } = require('chai');
const http = require('http');

const web = require('../index');

const server = web();

describe('Basic Functionality', () => {
  it('should create a HTTP server', (done) => {
    expect(server instanceof http.Server).to.be.true;
    done();
  });
  it('should be listening for connections when .listen() is called', (done) => {
    server.listen();
    expect(server.listening).to.be.true;
    done();
  });
});
