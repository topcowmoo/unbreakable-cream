// Select all new comment forms
const newCommentForm = document.querySelectorAll('#new-comment-form');

// Function to display options based on user session
const displayOptions = async () => {
  // Select card options container
  const cardOptions = document.querySelector('.card-options');
  // Get username from the comment box
  const cardUsername = document.querySelector('#username').innerHTML;
  // Get the req.session.username
  const sessionUsername = document.querySelector('.card-options').dataset.currentuser;

  // If card username and req.session.username match, display edit and delete buttons
  if (cardUsername === sessionUsername) {
    cardOptions.style.display = 'flex';
  }
};

// Create new comment
const commentHandler = async (event) => {
  event.preventDefault();

  // Get comment text and post ID from form data attributes
  const comment = document.querySelector('#new-comment').value.trim();
  const postId = event.target.dataset.id;

  if (comment) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: comment, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Reload the page if comment creation is successful
        document.location.reload();
      } else {
        // When unsuccessful, show alert
        alert('Failed to create a comment.');
      }
    } catch (error) {
      // Handle errors if fetch request fails
      console.error('Error:', error);
    }
  }
};

// Call displayOptions function to show/hide options based on user session
displayOptions();

// Attach commentHandler function to submit event of new comment forms
if (newCommentForm) {
  newCommentForm.forEach((element) => element.addEventListener('submit', commentHandler));
}
