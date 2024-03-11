
// const homeBtn = document.querySelector('#homebtn');
// const loginBtn = document.querySelector('#loginbtn');
// const postBtn = document.querySelector('#postbtn');
// const postCard = document.querySelectorAll('.card-title');


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

  // console.log(event.path[0].attributes[1].value);
  if (cardId !== '') {
    document.location.replace(`/post/${cardId}`);
  }
};


// Delete a post
var deletePostHandler = async (event) => {
  event.preventDefault();


  console.log(event.target);
  const postId = event.target.dataset.deleted;

  console.log(postId);

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
document.querySelector('#homebtn').addEventListener('click', homeHandler);
document.querySelector('#dashboardbtn').addEventListener('click', dashboardHandler);
if ( document.querySelector('#postbtn')) {
  document.querySelector('#postbtn').addEventListener('click', newPostHandler);
}
if (document.querySelector('#loginbtn')) {
  document.querySelector('#loginbtn').addEventListener('click', loginBtnHandler);
}
document.querySelectorAll('.card-title').forEach((element) => {
  element.addEventListener('click', postCardHandler);
});

