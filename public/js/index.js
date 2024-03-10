const dashboardBtn = document.querySelector('#dashboardbtn');
const homeBtn = document.querySelector('#homebtn');
const loginBtn = document.querySelector('#loginbtn');
const postBtn = document.querySelector('#postbtn');



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
const loginBtnHandler = (event) =>{
  event.preventDefault();

  document.location.replace('/login');
};








// Assign elements to handlers
homeBtn.addEventListener('click', homeHandler);
dashboardBtn.addEventListener('click', dashboardHandler);
if(postBtn){
  postBtn.addEventListener('click', newPostHandler);
}
if(loginBtn){
  loginBtn.addEventListener('click', loginBtnHandler);
}