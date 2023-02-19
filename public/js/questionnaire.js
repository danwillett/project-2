// linked to questionnaire page
// If this is a new user, questionnaire fields will be used to create a new Preferences instance
// for the user by firing a POST request

// If this is an existing user wanting to update preferecnes, the fields will be used to fire a PUT request
// to the database

const cityEl = document.getElementById("city-name");
const stateEl = document.getElementById("state-name");

const createBtn = document.getElementById("create-preferences");
const updateBtn = document.getElementById("update-preferences");

// create new user preferences when submit button is set to id=create-preferences
if (!createBtn == "") {
  createBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (cityEl.value == "" || stateEl == "") {
      alert("Please provide your city and state.");
      return false;
    }

    let preferences = JSON.stringify({
      city: cityEl.value,
      state: stateEl.value,
    });

    const response = await fetch("/api/users/add-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: preferences,
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to save preferences");
      location.reload();
    }
  });
}
// run update route if there are already existing user preferences
console.log(updateBtn);
if (!updateBtn == "") {
  console.log(updateBtn);
  updateBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("clicked");

    if (cityEl.value == "" || stateEl == "") {
      alert("Please provide your city and state.");
      return false;
    }

    let preferences = JSON.stringify({
      city: cityEl.value,
      state: stateEl.value,
    });

    const response = await fetch("/api/users/update-preferences", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: preferences,
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to save preferences");
      return false;
    }
  });

  // Path back to homepage for users trying to update their preferences
  const returnHomeBtn = document.getElementById("home-btn");
  returnHomeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.location.replace("/");
  });
}
