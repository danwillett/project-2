let yelpAPI = require("yelp-api");
require("dotenv").config();
// Create a new yelpAPI object with your API key
let apiKey = process.env.yelp_api;
let yelp = new yelpAPI(apiKey);

const router = require("express").Router();

router.get("/search", async (req, res) => {
  try {

    console.log(req.query);
    let cats = req.query.categories.split("_");
    console.log(cats);

    let location = `location=${req.query.city}`;
    let categories = [];
    for (let i = 0; i < cats.length; i++) {
      categories.push(`categories=${cats[i]}`);
    }
    console.log(categories);
    categories = categories.join("&");
    console.log(categories);
    let filters = `${location}&${categories}`;
    console.log(filters);
    // const searchResults = await yelp.query('businesses/search', params)

    const searchResults = await fetch(
      `https://api.yelp.com/v3/businesses/search?${filters}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      }
    );

    const searchObj = await searchResults.json();
    let businesses = searchObj.businesses;
    console.log(businesses);
    
    // if businesses have been found in the area with these parameters...
    if (businesses.length > 0) {
    console.log("try randomizing")
       // get random restaurant
    let randomBusId = Math.floor(Math.random() * (businesses.length-1))
    // console.log(businesses)
    console.log(randomBusId)
    let chosenRestaurant = businesses[randomBusId];
    console.log(chosenRestaurant)
    chosenRestaurant.address = chosenRestaurant.location.display_address[0] + ', ' + chosenRestaurant.location.display_address[1]
    return res.render('homepage', chosenRestaurant)
    } else {
      // if businesses haven't been found send a message to front end
      res.json({'message': 'No restaurants found! Please try editing your filters or increase your search radius!'})
    }

    // res.status(200).send(filterBusinesses)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.yelp.com/v3/categories?locale=en_US",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      }
    );

    const dataObj = await data.json();
    categories = dataObj.categories;
    foodCatsObj = categories.filter((cat) => {
      if (
        cat.alias == "food" ||
        cat.alias == "restaurants" ||
        cat.parent_aliases.includes("restaurants")
      ) {
        return cat;
      }
    });
    res.status(200).json(foodCatsObj);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
