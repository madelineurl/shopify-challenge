const router = require('express').Router();
const { Movie } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    if (movies) {
      res.status(200).json(movies);
    } else {
      res.send('No movies have been nominated to the database yet.');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { Title, Year, imdbID } = req.body;
    const movie = await Movie.create({ title: Title, year: Year, imdbID });
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
