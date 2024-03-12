// Logout button
const logoutBtn = document.querySelector('#logoutbtn');

// Logout button handler
const logoutBtnHandler = async () => {
  try {
    // Send a POST request to log out the user
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If logout is successful, navigate to the homepage
      document.location.replace('/');
    } else {
      // Handle failed logout attempt (optional)
      console.error('Logout failed.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Attach logout button handler to click event
if (logoutBtn) {
  logoutBtn.addEventListener('click', logoutBtnHandler);
}
