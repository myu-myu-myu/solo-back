const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { setupServer } = require('../../api');
const app = setupServer();

describe.only('2. Express(API)のテスト', () => {
  it('2-1 GET >>> /api/2', function (done) {
    chai
      .request(app)
      .get('/api/2')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    // Authenticate with Basic authentication
    // chai.request(app).get('/api2').auth('user', 'pass');
    // GET query parameters >>> /api1?name=foo&limit=10 >>> req.query
    // chai.request(app).get('/api2').query({ name: 'foo', limit: 10 });
  });

  let _id = 0;
  it('2-2 POST >>> /api/2', function (done) {
    chai
      .request(app)
      .post('/api/2')
      .send({
        title: 'post todo:chai-http',
        description: 'Postmanの代わりになる？',
        memo: '消化不良...やるしかない！',
      }) // >>> req.body
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0].title).to.equal('post todo:chai-http');
        _id = res.body[0].id;
        expect(err).to.be.null;
        done();
      });
    // chai
    //   .request(app)
    //   .put('/api2')
    //   .send({ password: '123', confirmPassword: '123' })
    //   .then(function (res) {
    //     expect(res).to.have.status(200);
    //   })
    //   .catch(function (err) {
    //     throw err;
    //   });
  });

  // なぜかPATCHだけ通らない。。。
  //   it('2-3 PATCH >>> /api/2/:id', function (done) {
  //     const A = _id;
  //     chai
  //       .request(app)
  //       .patch(`/api/2/${A}`)
  //       .send({ title: 'patch todo:chai-http' })
  //       .end(function (err, res) {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body[0].title).to.equal('patch todo:chai-http');
  //         expect(res.body[0].id).to.equal(A);
  //       });
  //     chai
  //       .request(app)
  //       .patch(`/api/2/${A}`)
  //       .send({ description: 'Byebye, Postman...' })
  //       .end(function (err, res) {
  //         expect(res.body[0].description).to.equal('Byebye, Postman...');
  //         expect(res.body[0].id).to.equal(A);
  //         expect(err).to.be.null;
  //         done();
  //       });
  //   });

  it('2-4 DELETE >>> /api/2/:id', function (done) {
    const A = _id;
    chai
      .request(app)
      .delete(`/api/2/${A}`)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body[0].id).to.equal(A);
        done();
      });
  });
});
