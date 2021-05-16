const router = require('express').Router()

const MoviesDB = require('../data/db-model')

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  MoviesDB.findMovieById(id)
    .then((movie) => {
      if (movie) {
        res.render('movie', {
          currentMovie: movie,
        })
      } else {
        next({
          statusCode: 400,
          errorMessage: 'the movie could not be found.',
          error,
        })
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: 'No movie was found on this id.',
        error,
      })
    })
})

router.post('/:id', (req, res, next) => {
  const { id } = req.params

  MoviesDB.findMovieById(id)
    .then((movie) => {
      MoviesDB.deleteMovie(id)
        .then((deleted) => {
          if (deleted) {
            res.redirect('/')
          } else {
            next({
              statusCode: 500,
              errorMessage: 'An error occurred while deleting the movie.',
            })
          }
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: 'An error occurred while deleting the movie.',
            error,
          })
        })
    })
    .catch((error) => {
      next({
        statusCode: 400,
        errorMessage:
          'The movie you are trying to delete does not exist in the database.',
        error,
      })
    })
})

module.exports = router
