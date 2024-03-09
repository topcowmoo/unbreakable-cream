 
const newPostFormHandler = async (event) => {
    event.preventDefault(); 
  
    // Get the title and content input by users.
    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();
  
    if (title && content) {
      try {
        // Send the POST request to the server.
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
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
  
  // Add event listener to the submit button.
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newPostFormHandler);
  }