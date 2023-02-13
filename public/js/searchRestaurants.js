// Get food categories list
const searchBtnEl = document.getElementById("search");
const categoryListEl = document.getElementById("show-list");
const filtersEl = document.getElementById("filters");

const searchRestaurants = async () => {
  const categoriesObj = await fetch("/api/yelp/categories");
  const categories = await categoriesObj.json();
  console.log(categories);

  searchBtnEl.addEventListener("keyup", async (event) => {
    event.preventDefault();
    var searchText = event.target.value;
    if (!searchText == "") {
      let regexp = new RegExp(searchText, "i");
      let matchList = categories.filter((x) => regexp.test(x));
      console.log("filling in");

      // if existing list items no longer match, delete them
      let listItems = categoryListEl.children;
      console.log(listItems);
      for (let i = 0; i < listItems.length; i++) {
        let listId = listItems[i].id;
        console.log(listId);
        if (!matchList.includes(listId)) {
            listItems[i].remove()
        }
      }

      // Show lists once text is longer than 3
      if (searchText.length >= 3) {
        matchList.forEach((cat) => {
          // if there's already a list item with this cat, don't make a new one
          if (document.getElementById(cat) == null) {
            let catItem = document.createElement("a");
            catItem.setAttribute(
              "class",
              "list-group-item list-group-item-action border-1"
            );
            catItem.setAttribute("href", "#");
            catItem.setAttribute("id", cat);
            catItem.textContent = cat;
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
        let category = event.target.id
        let currentFilters = [...filtersEl.children];
        let filterIds = currentFilters.map((obj) => obj.id)
        
        if (!filterIds.includes(category)) {
            let newFilter = document.createElement('li');
            newFilter.setAttribute("id", category)
            newFilter.setAttribute("class", "list-group-item")
            newFilter.textContent = category;
            filtersEl.appendChild(newFilter)
        }
    },)
  });
};

searchRestaurants();
