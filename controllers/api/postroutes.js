
const router = require('express').Router();
const { Post, User, Comment, } = require('../../models');
const withAuth = require('../../utils/auth');

// GET posts including authors' username.
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

// GET a post by post id, with comments.
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // Include the author's username, comments of the post and commenters' username
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!postData) {
      // If no post is found by the provided ID
      res.status(404).json({ message: 'No post found!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

//Create a new post when the user is logged in.

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    // Handle errors
    res.status(400).json(err);
  }
});

//Update an existing post with the user logged in.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { post_id: req.params.id },
    });

    if (!updatedPost[0]) {
      // If no post is found by the provided id.
      res.status(404).json({ message: 'No post found!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

//DELETE a post when the user is logged in.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete comments of the post
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    // Delete the post
    const deletedPost = await Post.destroy({
      where: { post_id: req.params.id },
    });

    if (!deletedPost) {
      // If no post is found by the provided id.
      res.status(404).json({ message: 'No post found!' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

module.exports = router;