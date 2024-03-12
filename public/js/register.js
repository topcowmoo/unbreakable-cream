// Register handler function
const registerHandler = async (event) => {
  event.preventDefault();

  // Connect variable names to HTML elements
  const email = document.querySelector('#email').value.trim();
  const username = document.querySelector('#create-username').value.trim();
  const password = document.querySelector('#create-password').value.trim();

  // Connect success and error messages to HTML elements
  const successMessage = document.querySelector('#register-success');
  const errorMessage = document.querySelector('#register-failed');

  // Fetch API to create a new user
  if (email && username && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Display success message if user registration succeeds
        successMessage.style.display = 'block';
      } else {
        // Display error message if registration fails
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      // Handle errors if fetch request fails
      console.error('Error:', error);
    }
  }
};

// Attach register handler function to submit event of the registration form
document.querySelector('#create-profile-form').addEventListener('submit', registerHandler);
