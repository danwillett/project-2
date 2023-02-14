const router = require('express').Router();
const { User, Preferences } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id
    const userData = await User.findByPk(userId, {
      include: [{model: Preferences}],
      attributes: { exclude: ['password'] },
    });
    // console.log(userData)
    const userObj = userData.get({ plain: true })
    const preferences = userObj.Preference;
    preferences.location = preferences.city + ", " + preferences.state;
    console.log(preferences)
    res.render('homepage', {
      preferences,     
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/createAccount', (req, res) => {
  res.render('createUser')
})

router.get('/questionnaire', withAuth, (req, res) => {
  res.render('questionnaire')
})

module.exports = router;
