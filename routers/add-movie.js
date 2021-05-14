const router = require('express').Router()
const data = require('../data')
const MoviesDB = require('../data/db-model')
const alert = require('alert')
router.get('/', (req, res) => {
  res.render('add')
})

router.post('/', (req, res, next) => {
  let newMovie = {
    name: req.body.addName,
    director: req.body.addDirector,
    stars: req.body.addStars,
    about: req.body.addAbout,
  }

  //Checking whether the object's elements are empty.
  let emptyInfo = true
  Object.keys(newMovie).map((element) => {
    if (newMovie[element].trim() === '') {
      emptyInfo = false
    }
  })

  if (emptyInfo === false) {
    res.redirect('/add-movie')
    alert('Film Bilgileri Bos Olamaz.')
  } else {
    MoviesDB.addMovie(newMovie)
      .then((movie) => {
        res.redirect('/')
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: 'Film Eklenemedi',
          error,
        })
      })
  }
})

module.exports = router
