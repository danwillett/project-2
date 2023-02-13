let yelpAPI = require('yelp-api');

// Create a new yelpAPI object with your API key
let apiKey = '7Yd3yqVd25Ugww-nfqbIZ9OkKNAThCd7M52-fcS58bYAb2lze68QiGuP6EoFrQSEOTCJybZe3yRE18SyAEI9NTqgSBd1hCMEYDbZ8trFvM5KgQ0jOIKbJG9pPA_jY3Yx';
let yelp = new yelpAPI(apiKey);

// // Set any parameters, if applicable (see API documentation for allowed params)
// let params = [{ location: 'Goleta, CA', term: 'indian food', attributes: [''] }];

// // Call the endpoint

const router = require('express').Router();

// {
//     "location": ,
//     "cuisine": ,
// }

router.get('/yelp', async (req, res) => {
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

  module.exports = router;