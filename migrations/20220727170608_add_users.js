exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name", 255);
    table.integer("age");
    table.string("gender", 255);
    table.string("car", 255);
    table.string("address", 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
