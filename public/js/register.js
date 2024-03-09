const registerHandler = async (event) =>{
  event.preventDefault();

  // Connect variable names to HTML elements
  const email = document.querySelector('#email').value.trim();
  const username = document.querySelector('#create-username').value.trim();
  const password = document.querySelector('#create-password').value.trim();

  const successMessage = document.querySelector('#register-success');
  const errorMessage = document.querySelector('#register-failed');

  // Fetch api to create new user
  if (email && username && password){
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({email, username, password}),
      headers: ({'Content-Type': 'application/json'})
    });

    if(response.ok){
      // Display success message if user registration succeeds
      // errorMessage.style.display = 'none';
      successMessage.style.display = 'block';
    }else{
      // Display error message if register fails
      errorMessage.style.display = 'block';
    }
  }
};

document.querySelector('#create-profile-form').addEventListener('submit', registerHandler);