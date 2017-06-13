const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

const fixtures = require('./fixtures');

describe('CRUD locations', () => {
  before((done) => {
      knex.migrate.latest()
        .then(() => {
          return knex.seed.run();
        }).then(() => done());

  });

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/locations')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.locations);
        done();
      });
  });

  it('Creates a record', (done) => {
    request(app)
      .post('/api/locations')
      .send(fixtures.location)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.location.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.location);
        done();
      });
  });

  // it('Updates a record', (done) => {
  //   fixtures.location.days = 3;
  //   request(app)
  //     .put('/api/locations/10')
  //     .send(fixtures.location)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).to.be.a('object');
  //       expect(response.body).to.deep.equal(fixtures.location);
  //       done();
  //     });
  // });
});
