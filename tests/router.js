const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const web = require('../index');

const server = web.server();
const router = web.router();

chai.use(chaiHttp);

describe('Routers', () => {
  before((done) => {
    server.listen();
    server.use(router);
    done();
  });
  it('should accept handlers for requests', (done) => {
    const testHandlerGet = (request, response) => {
      response.writeHead(200);
      response.end('testGet');
    };
    const testHandlerPost = (request, response) => {
      response.writeHead(200);
      response.end(request.body);
    };
    router.get(testHandlerGet);
    router.post(testHandlerPost);
    expect(router._getHandlers['/']).to.have.lengthOf.at.least(1);
    expect(router._getHandlers['/'][0]).to.equal(testHandlerGet);
    expect(router._postHandlers['/']).to.have.lengthOf.at.least(1);
    expect(router._postHandlers['/'][0]).to.equal(testHandlerPost);
    done();
  });
  it('should use its own handlers for requests', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('testGet');
        chai
          .request(server)
          .post('/')
          .send('testPost')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('testPost');
            done();
          });
      });
  });
});
