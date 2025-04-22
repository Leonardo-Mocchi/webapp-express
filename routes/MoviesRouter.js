const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController')

// index route
router.get('/', MoviesController.index);

// show route
router.get('/:id', MoviesController.show);

// create review route
router.post('/:id/reviews', MoviesController.createReview);

module.exports = router;