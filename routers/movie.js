const router = require('express').Router()
const data = require('../data')
const MoviesDB = require('../data/db-model')

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  MoviesDB.findMovieById(id)
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie)
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

  // const movie = data.find((movie) => movie.id === parseInt(id))
  // if (movie) {
  //   res.status(200).json(movie)
  // } else {
  //   next({
  //     statusCode: 400,
  //     errorMessage: 'boyle  bir film yok',
  //   })
  //   // res.status(200).json('bu id de bir film bulunamadi')
  // }
  // console.log(id)
})

module.exports = router
