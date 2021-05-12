const express = require('express')
const app = express()
const data = require('./data')
const movieRouter = require('./routers/movie')
const addMovieRouter = require('./routers/add-movie')
const updateMovieRouter = require('./routers/update-movie')
const errorHandling = require('./middlewares/errorHandling')

const MoviesDB = require('./data/db-model')
app.use(express.json())

app.use('/movie', movieRouter)
app.use('/add-movie', addMovieRouter)
app.use('/update-movie', updateMovieRouter)

app.get('/', (req, res, next) => {
  const moviesName = []
  MoviesDB.findMovie()
    .then((movies) => {
      for (i in movies) {
        moviesName.push(movies[i].name)
      }
      res.status(200).json(moviesName)
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: 'Filmler getirlemedi',
        error,
      })
    })
})

app.use(errorHandling)

app.listen(3000, () => {
  console.log('Server port 3000 online...')
})
