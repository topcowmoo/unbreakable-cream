// Import modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// GET route to Display all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users with associated posts and comments
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
      // Exclude the 'password' attribute to hide sensitive information
      attributes: { exclude: ['password'] },
    });

    // Respond with a JSON array of users
    res.status(200).json(users);
  } catch (err) {
    // Handle errors and respond with a 500 Internal Server Error
    res.status(500).json({ error: 'Failed to retrieve list of all users' });
  }
});

// Display single user by id
router.get('/:id', async (req, res) => {
  try {
    // Fetch user with the associated posts and comments
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post}, {model: Comment}],
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      // if the user doesn't exist, respond with a 404 not found status
      res.status(404).json({ error: 'User with that id not found'});
      return;
    }
    // if the user exists, respond with user data
    res.status(200).json(user);
  }catch (err) {
    // Catch all for other erros, and respond with a 500 internal server error with message
    res.status(500).json({ error: 'Failed to retrieve user data'});
  }
});

//POST route to create a new user
router.post('/signup', async (req, res) =>{
  try{
    const usernameExists = await User.findOne({
      where: {username: req.body.username}
    });
    const emailExists = await User.findOne({
      where: {email: req.body.email}
    });

    if(!usernameExists && !emailExists){
      const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password

      };
      await User.create(newUser);

      res.status(200).json({message: 'Successfully Signed up'});
    }
  } catch(err) {
    res.status(500).json({error: 'Failed to signup'});
  }
});

// Post route to login
router.post('/login', async (req, res,) => {
  try{
    // Find a user in the database based on the provided username
    const user = await User.findOne({
      where: { username: req.body.username}
    });
    // If no user is found, respond with a 400 status and error message
    if (!user) {
      res.status(400).json({error: 'Invalid username or password'});
      return;
    }
    // Check if the entered password is valid using the checkPassword method
    const passwordIsValid = user.checkPassword(req.body.password);
    // If the password is falsey, respond with a 400 status and an error message
    if (!passwordIsValid) {
      res.status(400).json({error: 'Invalid pusername or password'});
      return;
    }
    // Save the session data upon successful login
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggIn = true;
      // Respond with a JSON object indicating a successful login
      res.json({message: ' Successfully logged in'});
    });

  } catch (err) {
    // If an error occurs during the login process, respond with 500 status and an error message
    res.status(500).json({ error: 'Failed to Login'});
  }
});

// Post route to logout
router.post('/logout', (req, res) =>{
  try {
    if (req.session.loggedIn) {
      //Remove the session variables
      req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      // If the user is not logged in respond with a 401 Unauthorized status
      res.status(401).end();
    }
  } catch(err) {
    // If an error occurs during the logout process, respond with a 500 status and an error message
    res.status(500).json({ error: 'Failed to logout'});
  }
});

//Post route to like a post
router.post('/:userId/like/:postId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({
      where: {
        user_id: userId,
        post_id: postId
      }
    });

    if (existingLike) {
      // If the user has already liked the post, respond with a 400 status error and message
      res.status(400).json({error: 'User has already liked this post'});
      return;
    }

    //Create a new like record
    await Like.create({
      user_id: userId,
      post_id: postId
    });

    //Respond with a success message
    res.status(200).json({messager: 'You liked this post!'});
  }catch (err) {
    //Handle errors and respond with a 500 Internal Server Error
    console.error(err);
    res.status(500).json({error:'Failed to like post'});
  }
});

// POST route to favorite a post
router.post('/:userId/favorite/:postId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Check if the user has already favorited the post
    const existingFavorite = await Favorite.findOne({
      where: {
        user_id: userId,
        post_id: postId
      }
    });

    if (existingFavorite) {
      // If the user has already favorited the post, respond with a 400 status and an error message
      res.status(400).json({ error: 'User has already favorited this post' });
      return;
    }

    // Create a new Favorite record
    await Favorite.create({
      user_id: userId,
      post_id: postId
    });

    // Respond with a success message
    res.status(200).json({ message: 'Post favorited successfully' });
  } catch (err) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Failed to favorite post' });
  }
});