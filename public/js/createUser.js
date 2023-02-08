// create handlebars create account page to link to
// on submit, retrieve account info

const createFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();
    console.log(JSON.stringify({ username, password }))
    if (username && password) {
      const response = await fetch('/api/users/create-account', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert("greate work!")
        document.location.replace('/questionnaire');
      } else {
        alert('Failed to create account');
      }
    }
  };
  
  document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);
  