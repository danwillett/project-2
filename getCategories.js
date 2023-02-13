require('dotenv').config()
let apiKey = process.env.yelp_api;
console.log(apiKey)

const getCategories = async () => {
    try {
        const data = await fetch('https://api.yelp.com/v3/categories?locale=en_US', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        })

        const js = await data.json();
        categories = js.categories;
        foodCatsObj = categories.filter((cat) => {
            
            if (cat.alias == "food" || cat.alias == "restaurants" || cat.parent_aliases.includes("restaurants")) {
                return cat
            }
        })
        foodCatsArray =  foodCatsObj.map((obj) => obj.title);
        console.log(foodCatsArray)
    } catch (err) {
        console.log(err)
    }
    
    
}

getCategories()