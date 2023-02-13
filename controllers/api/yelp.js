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

router.get('/restaurantSearch', async (req, res) => {
    try {

    let params = [
        { location: req.body.location, 
        term: req.body.cuisine, 
        // attributes: 
    }];

    const searchResults = await yelp.query('businesses/search', params)
    let searchObj = JSON.parse(searchResults)
    let businesses = searchObj.businesses;
    const filterBusinesses = businesses.filter((business) => {
      let categories = business.categories
      console.log(categories)
      for (let i=0; i<categories.length; i++) {
        if (categories[i].alias.toLowerCase() == params[0].term.toLowerCase()) {
          return business
        }
      }
      
    })
    console.log(filterBusinesses)

    res.status(200).send(filterBusinesses)
 
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
    foodCatsArray =  foodCatsObj.map((obj) => obj.title);
    console.log(foodCatsArray)
    res.status(200).json(foodCatsArray)

} catch (err) {
    res.status(500).json(err)
    console.log(err)
}

})  
  module.exports = router;