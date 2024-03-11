const dashboardBtn = document.querySelector('#dashboardbtn');
const homeBtn = document.querySelector('#homebtn');
const loginBtn = document.querySelector('#loginbtn');
const postBtn = document.querySelector('#postbtn');
const postCard = document.querySelectorAll('.card-title');
const editbtnEl = document.querySelector('.editbtn');
const deletebtnEl = document.querySelector('.deletebtn');

// Go to home page
const homeHandler = (event) => {
  event.preventDefault();

  document.location.replace('/');
};

// Go to dashboard
const dashboardHandler = (event) => {
  event.preventDefault();

  document.location.replace('/dashboard');
};

// Go to a new page to create a post
const newPostHandler = (event) => {
  event.preventDefault();

  document.location.replace('/createPost');
};

// Go to login page
const loginBtnHandler = (event) => {
  event.preventDefault();

  document.location.replace('/login');
};

// Go to a new page to comment on a post you are seeing
const postCardHandler = (event) => {
  event.preventDefault();

  const cardId = event.target.getAttribute('id');

  // console.log(event.path[0].attributes[1].value);
  if (cardId !== '') {
    document.location.replace(`/post/${cardId}`);
  }
};

// Go to a new page to edit a post
const editPostHandler = (event) => {
  event.preventDefault();

  // Get ID from H3 tag
  const postId = document.querySelector('.editbtn').getAttribute('data-edited');
  // const postId = event.target.getAttribute('data-edited');

  console.log(postId);

  if (postId !== '') {
    // console.log('replace');
    document.location.replace(`/editpost/${postId}`);
  }
};

// Delete a post
const deletePostHandler = async (event) => {
  event.preventDefault();

  // Get ID from H3 tag
  const postId = document
    .querySelector('.deletebtn')
    .getAttribute('data-deleted');
  // const postId = event.target.getAttribute('data-deleted');

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
homeBtn.addEventListener('click', homeHandler);
dashboardBtn.addEventListener('click', dashboardHandler);
if (postBtn) {
  postBtn.addEventListener('click', newPostHandler);
}
if (loginBtn) {
  loginBtn.addEventListener('click', loginBtnHandler);
}
postCard.forEach((element) => {
  element.addEventListener('click', postCardHandler);
});
editbtnEl.addEventListener('click', editPostHandler);
deletebtnEl.addEventListener('click', deletePostHandler);
