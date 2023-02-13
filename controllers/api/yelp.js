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


// format:
// headers: {
//   "Authorization HTTP": "Bearer 7Yd3yqVd25Ugww-nfqbIZ9OkKNAThCd7M52-fcS58bYAb2lze68QiGuP6EoFrQSEOTCJybZe3yRE18SyAEI9NTqgSBd1hCMEYDbZ8trFvM5KgQ0jOIKbJG9pPA_jY3Yx"
// }


// router.get('/yelpCategories', async (req, res) => {

//   try {


//     // const sdk = require('api')('@yelp-developers/v1.0#22jt41lckiwavc');

//     // const usCategories = await sdk.v3_all_categories({locale: 'en_US'})
//     // res.status(200).send(usCategories)


//     // let params = [{
//     //   locale: "en_US"
//     // }]

//     const usCategories = await yelp.query('categories', params)
//     // res.status(200).send(usCategories)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
    
//   }

// })  
  module.exports = router;