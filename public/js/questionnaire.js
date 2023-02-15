const cityEl = document.getElementById('city-name');
const stateEl = document.getElementById('state-name');

const submitBtn = document.getElementById('submit-questionnaire');

console.log(submitBtn)
console.log(cityEl.value)
submitBtn.addEventListener('click', (event) => {
    console.log(cityEl.value)
    event.preventDefault()
    event.stopPropagation()

    fetch('/api/users/add-preferences', {
        method: 'POST',
        body: {
            "city": cityEl.value,
            "state": stateEl.value,
        }
    })

})
