
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');






// POST route to make a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    // Create a new comment with the provided data and associate it with the authenticated user
    const newComment = await Comment.create({
      // Spread the request body to include comment content
      ...req.body,
      post_id: parseInt(req.body.post_id),
      // Set the user_id based on the authenticated user's session
      user_id: req.session.user_id,
    });
      // Respond with a JSON object containing the newly created comment data
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs during the comment creation, respond with a 400 status and an error message
    res.status(400).json({message: 'Failed to create comment', error: err});
  }
});








//Update an existing comment with the user logged in.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedComment[0]) {
      // If no Comment is found by the provided id.
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

//DELETE a comment when the user is logged in.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (!deletedComment) {
      // If no comment is found by the provided id.
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

module.exports = router;