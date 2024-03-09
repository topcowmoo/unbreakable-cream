const loginHandler = async (event) =>{
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if(username && password){
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: ({'Content-Type': 'application/json'})
    });

    if(response.ok){
      // If login information is correct, take user to the dashboard
      document.location.replace('/');
    }else{
      // Display error message if login fails
      const errorMessage = document.querySelector('#login-failed');
      errorMessage.style.display = 'block';
    }
  }
};

document.querySelector('#log-in-form').addEventListener('submit', loginHandler);