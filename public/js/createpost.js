
// Function to handle submitting a new post
const postHandler = async (event) => {
  event.preventDefault();

  // Get the title and content input by users.
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#new-post').value.trim();

  // Check if both title and content are provided
  if (title && content) {
    try {
      // Send a POST request to the server to create a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ post_title: title, post_content: content}),
        headers: { 'Content-Type': 'application/json' },
      });

      // Redirect to the dashboard page if the post request was successful
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the post request failed, show an alert
        alert('Oops! Something went wrong.');
      }
    } catch (error) {
      // Log errors
      console.error('Error creating a new post:', error);
    }
  }
};

// Add event listener to the form for submitting a new post
document.querySelector('#new-post-form').addEventListener('submit', postHandler);
