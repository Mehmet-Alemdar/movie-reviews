const router = require('express').Router()
const data = require('../data')
const MoviesDB = require('../data/db-model')

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  MoviesDB.findMovieById(id)
    .then((movie) => {
      if (movie) {
        res.render('movie', {
          currentMovie: movie,
        })
        // res.status(200).json(movie)
      } else {
        next({
          statusCode: 400,
          errorMessage: 'Film yok',
          error,
        })
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: 'Bu id de film bulunamadi',
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
            // res.send(204).end()
          } else {
            next({
              statusCode: 500,
              errorMessage: 'Film silinirken hata olustu.',
            })
          }
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: 'Film silinirken hata olustu 2.',
            error,
          })
        })
    })
    .catch((error) => {
      next({
        statusCode: 400,
        errorMessage:
          'Silimeye calistiginiz film veri tabaninda bulunmamaktadir.',
        error,
      })
    })
})

module.exports = router
