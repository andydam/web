const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const web = require('../index');

const server = web.server();

chai.use(chaiHttp);

describe('GET method', () => {
  before((done) => {
    server.listen();
    done();
  });
  it('should add a handler for GET requests', (done) => {
    const testHandler = (request, response) => {
      response.writeHead(200);
      response.end('test');
    };
    server.get(testHandler);
    expect(server._getHandlers['/']).to.have.lengthOf.at.least(1);
    expect(server._getHandlers['/'][0]).to.equal(testHandler);
    done();
  });
  it('should use the added handler for GET requests', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('test');
        done();
      });
  });
  it('should accept a handler for GET request to a given path', (done) => {
    const testHandler2 = (request, response) => {
      response.writeHead(200);
      response.end('test2');
    };
    server.get('/test2', testHandler2);
    expect(server._getHandlers['/test2']).to.have.lengthOf.at.least(1);
    expect(server._getHandlers['/test2'][0]).to.equal(testHandler2);
    done();
  });
  it('should use the added handler for GET request to a given path', (done) => {
    chai
      .request(server)
      .get('/test2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('test2');
        done();
      });
  });
  it('should accept a handler for GET request to a given path with param', (done) => {
    const testHandler3 = (request, response) => {
      response.writeHead(200);
      response.end(request.params.test);
    };
    server.get('/test3/:test', testHandler3);
    expect(server._getHandlers['/test3/:test']).to.have.lengthOf.at.least(1);
    expect(server._getHandlers['/test3/:test'][0]).to.equal(testHandler3);
    done();
  });
  it('should use the added handler for GET request to a given path with param', (done) => {
    chai
      .request(server)
      .get('/test3/atest')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should pass the param value to the added handler for GET request to a given path with param', (done) => {
    chai
      .request(server)
      .get('/test3/atest')
      .end((err, res) => {
        expect(res.text).to.equal('atest');
        done();
      });
  });
});
