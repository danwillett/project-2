const router = require('express').Router();
const { User } = require('../../models');
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
  console.log(req.body)
  
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
      
      console.log("ok?")
      res.json({ user: userData, message: 'Created new account. You are now logged in!' });
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
