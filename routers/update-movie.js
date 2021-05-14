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
    alert('Film bilgileri bos olamaz.')
  } else {
    MoviesDB.updateMovie(updatedMovie, id)
      .then((updated) => {
        res.redirect('/movie/' + id)
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
