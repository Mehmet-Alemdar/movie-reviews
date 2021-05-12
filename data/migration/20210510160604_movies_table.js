exports.up = function (knex) {
  return knex.schema.createTable('movies_table', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.string('director').notNullable()
    table.string('stars').notNullable()
    table.string('about').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies_table')
}
