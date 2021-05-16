exports.up = function (knex) {
  return knex.schema.createTable('movies_table', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.text('director').notNullable()
    table.text('stars').notNullable()
    table.text('about').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies_table')
}
