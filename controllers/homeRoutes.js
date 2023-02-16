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
    const userObj = userData.get({ plain: true })
    const preferences = userObj.Preference;

    preferences.locationDisplay = preferences.city + ", " + preferences.state;

    req.session.save(() => {
      req.session.preferences = preferences;
    });
    
    res.render('homepage', {
      preferences,     
      logged_in: req.session.logged_in,
      user_id: userObj.username

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

router.get('/questionnaire', withAuth, async (req, res) => {
  const userId = req.session.user_id
  const preferencesData = await Preferences.findOne({where: {user_id: userId}});
  // change handlebars questionnaire view to accommadate updating preferences or creating new preferences
  let prefs;
  if (!preferencesData) {
     prefs = {
      exist: false
     }   
  } else {
    prefs =  {
      exist: true
     }
  }
  res.render('questionnaire', prefs)
})

module.exports = router;
