const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment, } = require('../models');

// GET route homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username',]}]
    });
    const posts = postData.map((post) => post.get({ plain:true}));
    // send to homepage.handlebars
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// GET route dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        where: { username: req.session.username },
      }]
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    // Send to dashboard.handlebars
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      currentUser: req.session.username
    });
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// GET route login
router.get('/login', (req, res) => {
  try {
    // send to login.handlebars
    res.render('login');
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// GET route to create post
router.get('/createPost', withAuth, (req, res) => {
  try {
    // send to createPost.handlebars
    res.render('createPost',
      {
        loggedIn: req.session.loggedIn,
        user: {username: req.session.username}
      });
  }catch (err){
    res.json(err);
  }
});

// GET post and comment by ID
router.get('/post/:id', withAuth, async (req, res) =>{
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {model: User, attributes: ['username']},
        {
          model: Comment,
          include: [{ model: User, attributes: ['username']}],
        },
      ],
    });
    const post = postData.get({ plain: true });
    // send to post.handlebars
    res.render('viewPost', {
      ...post,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {

    res.status(500).json({error: 'Internal Server Error'});
  }
});

// GET request to go to EDIT PAGE to edit a singular post
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with that ID' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('editpost', {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;