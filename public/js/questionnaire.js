const cityEl = document.getElementById('city-name');
const stateEl = document.getElementById('state-name');

const submitBtn = document.getElementById('submit-questionnaire');

console.log(submitBtn)
console.log(cityEl.value)
submitBtn.addEventListener('click', async (event) => {
    console.log(cityEl.value)
    event.preventDefault()
    event.stopPropagation()

    if (cityEl.value == '' || stateEl == '') {
        alert("Please provide your city and state.")
        location.reload()
    }

    let preferences = JSON.stringify({
        "city": cityEl.value,
        "state": stateEl.value,
    })

    const response = await fetch('/api/users/add-preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: preferences
    })
    console.log(response)

    if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to save preferences');
        location.reload();
      }


})
