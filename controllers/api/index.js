// Import required modules
const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');
const commentRoutes = require('./commentroutes');

// Use user routes
router.use('/users', userRoutes);
// Use post routes
router.use('/posts', postRoutes);
// Use comment routes
router.use('/comments', commentRoutes);

// Export the router
module.exports = router;
