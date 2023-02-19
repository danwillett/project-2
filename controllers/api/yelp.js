require("dotenv").config();
const router = require("express").Router();

// yelp fusion api key
let apiKey = process.env.yelp_api;

// route feeds user-specified location and cuisine filters to yelp fusion api
router.get("/search", async (req, res) => {
  try {
    let businesses = [];
    let location = `location=${req.query.city}`;

    let cats = req.query.categories.split("_");
    let categories = [];
    for (let i = 0; i < cats.length; i++) {
      categories.push(`categories=${cats[i]}`);
    }
    categories = categories.join("&");
    console.log(categories);

    // if there the user has input categories, search for businesses
    if (!categories == "") {
      let filters = `${location}&${categories}`;
      const filterResults = await fetch(
        `https://api.yelp.com/v3/businesses/search?${filters}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
        }
      );
      const searchObj = await filterResults.json();
      businesses.push(searchObj.businesses);
    }

    // if the user has a search term input, add results from this search to the businesses pool
    if (!req.query.term == "") {
      let term = `${location}&term=${req.query.term.replace(" ", "%20")}`;
      console.log(term);
      const termResults = await fetch(
        `https://api.yelp.com/v3/businesses/search?${term}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
        }
      );
      const termObj = await termResults.json();
      businesses.push(termObj.businesses);
      console.log(businesses);
    }

    // if the user doesn't specify a cuisine or term, search all restaurants in the given location
    if (!req.query.term == "" && !categories == "") {
      const results = await fetch(
        `https://api.yelp.com/v3/businesses/search?${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiKey,
          },
        }
      );
      const resultsObj = await results.json();
      businesses.push(resultsObj.businesses);
    }
    businesses = businesses.flat();

    // if businesses have been found in the area with these parameters...
    if (businesses.length > 0) {
      // get random restaurant
      let randomBusId = Math.floor(Math.random() * (businesses.length - 1));
      let chosenRestaurant = businesses[randomBusId];

      // use restuarant id to get additional information using the yelp search business by id route
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

      const businessData = await businessResult.json();
      console.log(businessData);

      return res.status(200).json(businessData);
    } else {
      // if businesses haven't been found send a message to front end
      res.status(404).json({
        message:
          "No restaurants found! Please try editing your filters or increase your search radius!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// route gets all food categories type from yelp categories API
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
    console.log(dataObj);
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
