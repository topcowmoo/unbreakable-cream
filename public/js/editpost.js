// Extracts the post ID from the current page URL.
const post_id = window.location.toString().split('/').pop();

const updatePostHandler = async (event) => {
  event.preventDefault();

  // Get the title and content updated by users
  const title = document.querySelector("#title-update").value.trim();
  const content = document.querySelector("#content-update").value.trim();

  if (title && content) {
    // Send the PUT request to the server.
    try {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ post_title: title, post_content: content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Redirect to the dashboard page if the PUT request was ok .
        document.location.replace("/dashboard");
      } else {
        // If the put request failed, show an alert.
        alert("Failed to update the post.");
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();
  // Send the DELETE request to the server.
  try {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Redirect to the dashboard page if the DELETE request was ok .
      document.location.replace("/dashboard");
    } else {
      // If the delete request failed, show an alert.
      alert("Failed to delete the post.");
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

document.querySelector("#update-post")?.addEventListener("click", updatePostHandler);
document.querySelector("#delete-post")?.addEventListener("click", deletePostHandler);