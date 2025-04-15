const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController')

//index route
router.get('/', MoviesController.index);

//show route
router.get('/:id', MoviesController.show);

module.exports = router;