const router = require('express').Router();
const { User, Preferences} = require('../../models');
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    console.log(userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/create-account', async (req, res) => {
  
  try {    
    const newUser = {
      username: req.body.username,
    };

    newUser.password = await bcrypt.hash(req.body.password, 10);
    console.log(newUser)
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    console.log(userData)

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Created new account. You are now logged in!' });
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/add-preferences', async (req, res) => {

try {
  
  const userPreferences = Preferences.create({
    city: req.body.city,
    state: req.body.state,
    price: 10,
    favoriteCuisine: "default",
    is_vegetarian: true,
    user_id: req.session.user_id
  })

  res.status(200).json({ userPreferences: userPreferences, message: 'Preferences saved!' });

} catch (err) {
  console.log(err)
  res.status(500).json(err)
}

})

router.put('/update-preferences', async (req, res) => {
console.log("updating")
  try {
    
    const userPreferences = Preferences.update(
      {
      city: req.body.city,
      state: req.body.state,
      price: 10,
      favoriteCuisine: "default",
      is_vegetarian: true,
      user_id: req.session.user_id
    },
    {
      where: {user_id: req.session.user_id}
    }
    )
    console.log(userPreferences)
  
    res.status(200).json({ userPreferences: userPreferences, message: 'Preferences saved!' });
  
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  
  })

// Routes for future development below... 

// router.post('/dislike-restaurant', async (req, res) => {
//   // user dislikes restaurant
//   /* req.body should look like this...
//     {
//       restaurant_id: "dalskdasd",
//       userIds: [1, 2, 3, 4]
//     }
//   */

// try {
//   const dislikedData = await Disliked.create()

//     const userDislikedIdArr = req.body.userIds.map((user_id) => {
//       return {
//         disliked_id: dislikedData.id,
//         user_id,
//       }
//     })
  
//   const userDislikedData = await UserDisliked.bulkCreate(userDislikedIdArr)
//       res.status(200).json({ dislikedData, userDislikedData })

// } catch (err) {
//   console.log(err)
//   res.json(err)
// }

// });

module.exports = router;
