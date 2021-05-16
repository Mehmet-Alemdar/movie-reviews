const router = require('express').Router()
const MoviesDB = require('../data/db-model')
const alert = require('alert')
router.get('/:id', (req, res, next) => {
  const { id } = req.params

  MoviesDB.findMovieById(id)
    .then((movie) => {
      if (movie) {
        res.render('update', {
          updateMovie: movie,
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
  const updatedMovie = {
    name: req.body.updatedName,
    director: req.body.updatedDirector,
    stars: req.body.updatedStars,
    about: req.body.updatedAbout,
  }

  //Checking whether the object's elements are empty.
  let emptyInfo = true
  Object.keys(updatedMovie).map((element) => {
    if (updatedMovie[element].trim() === '') {
      emptyInfo = false
    }
  })

  if (emptyInfo === false) {
    res.redirect('/update-movie/' + id)
    alert('movie information cannot be empty.')
  } else {
    MoviesDB.updateMovie(updatedMovie, id)
      .then((updated) => {
        res.redirect('/movie/' + id)
      })
      .catch((error) => {
        next({
          statsCode: 500,
          errorMessage: 'There was a problem updating the movie.',
          error,
        })
      })
  }
})

module.exports = router
