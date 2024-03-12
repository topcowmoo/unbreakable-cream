// Import required modules
const router = require('express').Router();

// Import routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Set up routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Export the router
module.exports = router;
