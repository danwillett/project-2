// Get food categories list
const searchBtnEl = document.getElementById("searchBtn");
const searchFieldEl = document.getElementById("search");
const categoryListEl = document.getElementById("show-list");
const filtersEl = document.getElementById("filters");

const getFilters = (event) => {
    let currentFilters = [...filtersEl.children];
    let filterIds = currentFilters.map((obj) => obj.id)
    return filterIds
}

const addFilters = async () => {
  const categoriesObj = await fetch("/api/yelp/categories");
  const categories = await categoriesObj.json();
  console.log(categories);

  searchFieldEl.addEventListener("keyup", async (event) => {
    event.preventDefault();
    var searchText = event.target.value;
    if (!searchText == "") {
      let regexp = new RegExp(searchText, "i");
      let matchList = categories.filter((x) => regexp.test(x.title));
      console.log("filling in");
      console.log(matchList)
      let categoryTitles = matchList.map((cat) => cat.title);

      // if existing list items no longer match, delete them
      let listItems = categoryListEl.children;
      console.log(listItems);
      for (let i = 0; i < listItems.length; i++) {
        let listId = listItems[i].id;
        console.log(listId);
        if (!categoryTitles.includes(listId)) {
            listItems[i].remove()
        }
      }

      // Show lists once text is longer than 3
      if (searchText.length >= 3) {
        matchList.forEach((cat) => {
          // if there's already a list item with this cat, don't make a new one
          if (document.getElementById(cat.title) == null) {
            let catItem = document.createElement("a");
            catItem.setAttribute(
              "class",
              "list-group-item list-group-item-action border-1"
            );
            catItem.setAttribute("href", "#");
            catItem.setAttribute("id", cat.title);
            catItem.setAttribute("data-alias", cat.alias)
            catItem.textContent = cat.title;
            categoryListEl.appendChild(catItem);
          }
        });
      } else {
        categoryListEl.innerHTML= '';
      }
    }
    // create filters group element
    categoryListEl.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.target)
        let category = event.target.getAttribute("id")
        let alias = event.target.getAttribute("data-alias")
        console.log(alias)
        let filters = getFilters(event);
        
        console.log(filters)
        
        if (!filters.includes(category)) {
            let newFilter = document.createElement('li');
            newFilter.setAttribute("id", category)
            newFilter.setAttribute("class", "list-group-item")
            newFilter.setAttribute("data", alias)
            newFilter.textContent = category;
            filtersEl.appendChild(newFilter)
        }
        categoryListEl.innerHTML= '';
        searchFieldEl.value = '';
    })
    
  });
};

addFilters();

// find restaurants matching filters categories
searchBtnEl.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let currentFilters = filtersEl.children;
    let aliases;
    for (let i = 0; i<currentFilters.length; i++) {
        console.log(currentFilters[i])
        if (i == 0) {
            aliases = currentFilters[i].getAttribute("data");
        } else {
            aliases = aliases.concat("_", currentFilters[i].getAttribute("data"))
        }
         
    }
     
    console.log(aliases)
    
    // need a city and state query parameter

    const yelpData = await fetch(`/api/yelp/search?categories=${aliases}&city=Goleta&state=CA`)
    const yelpObj = await yelpData.json()

    // get random restaurant
    let randomBusId = Math.floor(yelpObj.businesses.length-1 * Math.random)

    // chosen restaurant 
    let chosenRestaurant = yelpObj.businesses[randomBusId];
    

    console.log(yelpObj)
})


