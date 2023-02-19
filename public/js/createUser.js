// Linked to createUser.handlebars page.
// On click, will use the username and password input field values to fire a post request
// to our database, creating a new user.

const createFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-create").value.trim();
  const password = document.querySelector("#password-create").value.trim();
  console.log(JSON.stringify({ username, password }));

  if (username && password) {
    const response = await fetch("/api/users/create-account", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/questionnaire");
    } else {
      alert("Failed to create account. Please try again.");
    }
  }
};

document
  .querySelector(".create-form")
  .addEventListener("submit", createFormHandler);
