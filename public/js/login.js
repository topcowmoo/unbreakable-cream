// Login handler
const loginHandler = async (event) => {
  event.preventDefault();

  // Get username and password input by the user
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Ensure both username and password are provided
  if (username && password) {
    try {
      // Send a POST request to the server to log in
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If login is successful, redirect the user to the dashboard
        document.location.replace('/');
      } else {
        // If login fails, display an error message
        const errorMessage = document.querySelector('#login-failed');
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
};

// Attach login handler to the form submit event
document.querySelector('#log-in-form').addEventListener('submit', loginHandler);
