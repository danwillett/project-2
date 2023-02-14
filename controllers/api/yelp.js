let yelpAPI = require('yelp-api');
require('dotenv').config()
// Create a new yelpAPI object with your API key
let apiKey = process.env.yelp_api;
let yelp = new yelpAPI(apiKey);

const router = require('express').Router();

// {
//     "location": ,
//     "cuisine": ,
// }

router.get('/search', async (req, res) => {
    try {

      console.log(req.query)
      let cats = req.query.categories.split("_")
      console.log(cats)

      let location = `location=${req.query.city}`;
    let categories = [];
    for (let i = 0; i < cats.length; i++) {
      categories.push(`categories=${cats[i]}`)  
    }
    console.log(categories)
    categories = categories.join("&")
    console.log(categories)
    let filters = `${location}&${categories}`;
    console.log(filters)
    // const searchResults = await yelp.query('businesses/search', params)

    const searchResults = await fetch(`https://api.yelp.com/v3/businesses/search?${filters}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        }
    })
    // console.log(searchResults.json())
    const searchObj = await searchResults.json()
    console.log(searchObj)
    res.json(searchObj)
    let businesses = searchObj.businesses;
    console.log(businesses)

    // res.status(200).send(filterBusinesses)
 
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  });

router.get('/categories', async (req, res) => {

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
    console.log(foodCatsObj)
    // foodCatsArray =  foodCatsObj.map((obj) => obj.title);
    // console.log(foodCatsArray)
    res.status(200).json(foodCatsObj)

} catch (err) {
    res.status(500).json(err)
    console.log(err)
}

})  
  module.exports = router;