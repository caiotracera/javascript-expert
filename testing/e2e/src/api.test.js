const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('node:assert');

let app;

describe('API Suite test', () => {
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after((done) => {
    app.close(done);
  });

  describe('/contact:get', () => {
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(response.text, 'contact us page');
    });
  });

  describe('/login:post', () => {
    it('should request the login route with correct credentials and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'lorem', password: 'ipsum' })
        .expect(200);

      assert.strictEqual(response.text, 'ok');
    });

    it('should request the login route with wrong credentials and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'wrong', password: 'ipsum' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, 'unauthorized');
    });
  });

  describe('/hi:get', () => {
    it('should request an non-existent route return HTTP Status 404', async () => {
      const response = await supertest(app).get('/hi').expect(404);

      assert.ok(response.notFound);
    });
  });
});
