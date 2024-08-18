const router = require('express').Router();
const userRoutes = require('./userRoutes');
const trackRoutes = require('./trackRoutes');

router.use('/users', userRoutes);
router.use('/upload', trackRoutes);
module.exports = router;
