// Go to home page
var homeHandler = (event) => {
  event.preventDefault();
  document.location.replace('/');
};

// Go to dashboard
var dashboardHandler = (event) => {
  event.preventDefault();
  document.location.replace('/dashboard');
};

// Go to a new page to create a post
var newPostHandler = (event) => {
  event.preventDefault();
  document.location.replace('/createPost');
};

// Go to login page
var loginBtnHandler = (event) => {
  event.preventDefault();
  document.location.replace('/login');
};

// Go to a new page to comment on a post you are seeing
var postCardHandler = (event) => {
  event.preventDefault();
  const cardId = event.target.getAttribute('id');
  if (cardId !== '') {
    document.location.replace(`/post/${cardId}`);
  }
};

// Delete a post
var deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.deleted;
  if (postId !== '') {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

// Assign elements to handlers
document.getElementById('homebtn').addEventListener('click', homeHandler);
document.getElementById('dashboardbtn').addEventListener('click', dashboardHandler);
if (document.getElementById('postbtn')) {
  document.getElementById('postbtn').addEventListener('click', newPostHandler);
}
if (document.getElementById('loginbtn')) {
  document.getElementById('loginbtn').addEventListener('click', loginBtnHandler);
}
document.querySelectorAll('.card-title').forEach((element) => {
  element.addEventListener('click', postCardHandler);
});

