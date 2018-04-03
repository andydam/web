const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const path = require('path');
const web = require('../index');

const server = web.server();

chai.use(chaiHttp);

describe('Static Files', () => {
  before((done) => {
    server.use('/static', web.static('tests/testFiles'));
    server.listen();
    done();
  });
  it('should return a 200 for a path that leads to a file', (done) => {
    chai
      .request(server)
      .get('/static/index.html')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("should return a 404 for a path that doesn't lead to a file", (done) => {
    chai
      .request(server)
      .get('/static/doesNotExist.html')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should return a 403 for an invalid path', (done) => {
    chai
      .request(server)
      .get('/static/..')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
