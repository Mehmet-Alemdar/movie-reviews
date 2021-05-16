const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const movieRouter = require('./routers/movie')
const addMovieRouter = require('./routers/add-movie')
const updateMovieRouter = require('./routers/update-movie')
const errorHandling = require('./middlewares/errorHandling')

const MoviesDB = require('./data/db-model')
app.use(express.json())

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/movie', movieRouter)
app.use('/add-movie', addMovieRouter)
app.use('/update-movie', updateMovieRouter)

app.get('/', (req, res, next) => {
  MoviesDB.findMovie()
    .then((movies) => {
      res.render('home', {
        newMovieItem: movies,
      })
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: 'A problem occurred while fetching movies.',
        error,
      })
    })
})

app.use(errorHandling)

app.listen(3000, () => {
  console.log('Server port 3000 online...')
})
