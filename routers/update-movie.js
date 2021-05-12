const router = require('express').Router()
const MoviesDB = require('../data/db-model')

router.patch('/:id', (req, res, next) => {
  const { id } = req.params
  const updatedMovie = req.body

  if (!updatedMovie) {
    next({
      statusCode: 400,
      errorMessage: 'Film bilgileri bos olamaz',
    })
  } else {
    MoviesDB.updateMovie(updatedMovie, id)
      .then((updated) => {
        res.status(200).json(updated)
      })
      .catch((error) => {
        next({
          statsCode: 500,
          errorMessage: 'Guncellenirken bir sorun olustu',
          error,
        })
      })
  }
})

module.exports = router
