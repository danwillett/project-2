let yelpAPI = require("yelp-api");
require("dotenv").config();
// Create a new yelpAPI object with your API key
let apiKey = process.env.yelp_api;
const { User, Preferences} = require('../../models');
const router = require("express").Router();

router.get("/search", async (req, res) => {
  console.log(req.session)
  try {
    let cats = req.query.categories.split("_");

    let location = `location=${req.query.city}`;
    let categories = [];
    for (let i = 0; i < cats.length; i++) {
      categories.push(`categories=${cats[i]}`);
    }

    categories = categories.join("&");
    let filters = `${location}&${categories}`;

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

    // if businesses have been found in the area with these parameters...
    if (businesses.length > 0) {
      console.log("try randomizing");

      // get random restaurant
      let randomBusId = Math.floor(Math.random() * (businesses.length - 1));
      let chosenRestaurant = businesses[randomBusId];
      console.log(chosenRestaurant.id)

      const businessResult = await fetch(
        `https://api.yelp.com/v3/businesses/${chosenRestaurant.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
        }
      );
      
        
      const businessData = await businessResult.json()
      console.log(businessData)
      // chosenRestaurant.address =
      //   chosenRestaurant.location.display_address[0] +
      //   ", " +
      //   chosenRestaurant.location.display_address[1];

      // save location preferences in case they were editted in search window
      // console.log(req.session)
      // const userData = await User.findByPk(req.session.user_id, {
      //   include: [{model: Preferences}],
      //   attributes: { exclude: ['password'] },
      // });
      // const userObj = userData.get({ plain: true })
      // const preferences = userObj.Preference;

      // console.log(req.query.city)
      // preferences.city = req.query.city;
      // preferences.state = req.query.state;
      // preferences.locationDisplay = preferences.city + ", " + preferences.state;
      // console.log(preferences)


      return res.status(200).json(businessData)
      // return res.render("homepage", {
      //   chosenRestaurant,
      //   preferences: preferences,
      //   logged_in: req.session.logged_in,
      // });
    } else {
      // if businesses haven't been found send a message to front end
      res.status(404).json({
        message:
          "No restaurants found! Please try editing your filters or increase your search radius!",
      });
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
    console.log(dataObj)
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
