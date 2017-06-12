const knex = require('./knex'); //the connection

module.exports = {
  getAll() {
    return knex('location');
  },
  getOne(id) {
    return knex('location').where('id', id).first();
  },
  create(location) {
    return knex('location').insert(location, '*');
  },
  update(id, location) {
    return knex('location').where('id', id).update(location, '*');
  }
}
