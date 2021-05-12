const db = require('./db-config')

module.exports = {
  findMovie,
  findMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
}

function findMovie() {
  return db('movies_table')
}

function findMovieById(id) {
  return db('movies_table').where({ id }).first()
}

function addMovie(newMovie) {
  return db('movies_table')
    .insert(newMovie, 'id')
    .then(([id]) => {
      return db('movies_table').where({ id }).first()
    })
}

function updateMovie(updatedMovie, id) {
  return db('movies_table')
    .update(updatedMovie)
    .where({ id })
    .then((updated) => {
      if (updated) {
        return db('movies_table').where({ id }).first()
      }
    })
}

function deleteMovie(id) {
  return db('movies_table').del().where({ id })
}
