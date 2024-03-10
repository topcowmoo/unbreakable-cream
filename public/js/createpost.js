
const postHandler = async (event) => {
  event.preventDefault();

  // Get the title and content input by users.
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#new-post').value.trim();

  if (title && content) {
    try {
      // Send the POST request to the server.
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ post_title: title, post_content: content}),
        headers: { 'Content-Type': 'application/json' },
      });
        // Redirect to the dashboard page if the post request was ok .
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the post request failed, show an alert.
        alert('Oops! Something went wrong.');
      }
    } catch (error) {
      // Log errors.
      console.error('Error creating a new post:', error);
    }
  }
};

document.querySelector('#new-post-form').addEventListener('submit', postHandler);