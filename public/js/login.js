const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

const createBtn = document.getElementById('create-account')
console.log(createBtn)
createBtn.addEventListener('click', function(){
  console.log("hi")
  document.location.replace('/createAccount');
})


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler)

