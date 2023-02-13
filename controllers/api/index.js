const router = require('express').Router();
const userRoutes = require('./userRoutes');
const yelpRoutes = require('./yelp');

router.use('/users', userRoutes);
router.use('/', yelpRoutes)

module.exports = router;
