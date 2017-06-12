
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', (table) => {
    table.increments().primary();
    table.text('country').notNull();
    table.text('city').notNull;
    table.text('accomodation').notNull;
    table.integer('days').nullable();
    table.date('date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
