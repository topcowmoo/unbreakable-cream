// Get references to the title and body input fields
const titleBox = document.getElementById('title');
const bodyBox = document.getElementById('edit-post');

// Function to fetch data from the server for a specific post
const getTableData = async () => {
  try {
    // Extract the post ID from the URL
    const postId = window.location.pathname.split('/').pop();
    // Fetch data for the specified post from the API
    const response = await fetch(`/api/posts/${postId}`);
    // Parse the JSON response
    const data = await response.json();

    // Extract the post title and content from the data
    const { post_title, post_content } = data;

    // Set the value of the title and body input fields to the retrieved post title and content
    titleBox.value = post_title;
    bodyBox.value = post_content;
  } catch (error) {
    // Log any errors that occur during data fetching
    console.error('Error fetching data: ', error);
  }
};

// Call the getTableData function to fetch data for the current post
getTableData();

// Function to handle the update of a post
const updatePost = async (event) => {
  event.preventDefault();
  try {
    // Extract the post ID from the URL
    const postId = window.location.pathname.split('/').pop();
    // Send a PUT request to update the post data on the server
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the updated post title and content in the request body as JSON
      body: JSON.stringify({
        post_title: titleBox.value,
        post_content: bodyBox.value,
      }),
    });
    // Parse the JSON response
    const data = await response.json();
    // Log the updated post data
    console.log('Updated post:', data);
    // Redirect the user to the dashboard after successfully updating the post
    document.location.replace('/dashboard');
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error updating post: ', error);
  }
};

// Add an event listener to the submit button to handle post update
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', updatePost);

// Call the getTableData function to fetch data for the current post
getTableData();
