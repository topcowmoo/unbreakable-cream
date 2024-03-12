// Import required modules
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all posts and their associated user data
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    // Map fetched data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage with fetched posts data
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch all posts created by the current user
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          where: { username: req.session.username },
        },
      ],
    });
    // Map fetched data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard with fetched posts data
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      currentUser: req.session.username,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for login page
router.get('/login', (req, res) => {
  try {
    // Render the login page
    res.render('login');
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to create a new post
router.get('/createPost', withAuth, (req, res) => {
  try {
    // Render the create post page
    res.render('createPost', {
      loggedIn: req.session.loggedIn,
      user: { username: req.session.username },
    });
  } catch (err) {
    // Handle server error
    res.json(err);
  }
});

// GET route to view a post and its comments by ID
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Fetch the post and its associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    // Map fetched data to a plain object
    const post = postData.get({ plain: true });
    // Render the view comments page with fetched post data
    res.render('viewComments', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to go to the edit page to edit a post
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    // Fetch the post and its associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    // If no post is found, return a 404 error
    if (!postData) {
      res.status(404).json({ message: 'No post found with that ID' });
      return;
    }
    // Map fetched data to a plain object
    const post = postData.get({ plain: true });
    // Render the edit post page with fetched post data
    res.render('editPost', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
