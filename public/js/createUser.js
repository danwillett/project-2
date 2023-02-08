// create handlebars create account page to link to
// on submit, retrieve account info

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/createAccount', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create account');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  