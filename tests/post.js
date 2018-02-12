const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const web = require('../index');

const server = web.server();

chai.use(chaiHttp);

describe('POST method', () => {
  before((done) => {
    server.listen();
    done();
  });
  it('should add a handler for POST requests', (done) => {
    const testHandler = (request, response) => {
      response.writeHead(200);
      response.end(request.body);
    };
    server.post(testHandler);
    expect(server._postHandlers['/']).to.have.lengthOf.at.least(1);
    expect(server._postHandlers['/'][0]).to.equal(testHandler);
    done();
  });
  it('should use the added handler for POST requests', (done) => {
    chai
      .request(server)
      .post('/')
      .send('test')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('test');
        done();
      });
  });
  it('should accept a handler for GET request to a given path', (done) => {
    const testHandler2 = (request, response) => {
      response.writeHead(200);
      response.end(request.body);
    };
    server.post('/test2', testHandler2);
    expect(server._postHandlers['/test2']).to.have.lengthOf.at.least(1);
    expect(server._postHandlers['/test2'][0]).to.equal(testHandler2);
    done();
  });
  it('should use the added handler for GET request to a given path', (done) => {
    chai
      .request(server)
      .post('/test2')
      .send('test2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('test2');
        done();
      });
  });
  it('should parse incoming data and set it to request.body', (done) => {
    chai
      .request(server)
      .post('/')
      .send('testData')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('testData');
        done();
      });
  });
});
