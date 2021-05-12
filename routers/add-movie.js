const router = require('express').Router()
const data = require('../data')
const MoviesDB = require('../data/db-model')

router.get('/', (req, res) => {
  res.status(200).json(data)
})

let idd = 4
router.post('/', (req, res, next) => {
  let newMovie = req.body
  MoviesDB.addMovie(newMovie)
    .then((movie) => {
      res.status(201).json(movie)
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: 'Film Eklenemedi',
        error,
      })
    })
  // movie.id = idd
  // idd++
  // data.push(movie)
  // res.status(200).json(movie)
})

module.exports = router
