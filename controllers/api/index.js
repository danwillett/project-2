// import all api routes and condense into one export
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const yelpRoutes = require('./yelp');

router.use('/users', userRoutes);
router.use('/yelp', yelpRoutes)

module.exports = router;
