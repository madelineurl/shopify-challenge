const router = require('express').Router();
const { Movie } = require('../db');

router.post('/', async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
