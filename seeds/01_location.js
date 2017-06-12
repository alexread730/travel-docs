
const locations = require('../locations.js')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE location RESTART IDENTITY CASCADE;')
    .then(function () {
      return knex('location').insert(locations);
    });
};
