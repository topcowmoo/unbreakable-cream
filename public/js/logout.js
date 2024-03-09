const logoutBtn = document.querySelector('#logoutbtn');

const logoutBtnHandler = async () => {
  try {
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

if (logoutBtn) {
  logoutBtn.addEventListener('click', logoutBtnHandler);
}
