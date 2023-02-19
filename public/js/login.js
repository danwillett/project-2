// Linked to login.handlebars page.
// On submitting form, will check username and password values with database. If they match,
// the user will get logged in.

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

// creates a path to the create account page if the user doesn't have on yet
const createBtn = document.getElementById("create-account");
console.log(createBtn);
createBtn.addEventListener("click", function () {
  console.log("hi");
  document.location.replace("/createAccount");
});

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
