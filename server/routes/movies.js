const router = require('express').Router();
const { Movie } = require('../db');

router.post('/', async (req, res, next) => {
  try {
    const { Title, Year } = req.body;
    const movie = await Movie.create({ title: Title, year: Year });
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
