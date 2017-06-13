// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/travel-docs'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-travel-docs'
  }
};
