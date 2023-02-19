const User = require('./User');
const Preferences = require('./Preferences');
const Disliked = require('./Disliked')
const UserDisliked = require('./UserDisliked')

// users have one preferences model associated with it
User.hasOne(Preferences, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// preferences belong to the user model
Preferences.belongsTo(User, {
  foreignKey: 'user_id',
});

// these associations are not currently active, but may be in future development
// there is a many to many association between the user model, and disliked restaurant model
// connected through the UserDisliked Model
User.belongsToMany(Disliked, {
  through: UserDisliked,
  foreignKey: "user_id",
})

Disliked.belongsToMany(User, {
  through: UserDisliked,
  foreignKey: "restaurant_id",
})

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { User, Preferences, Disliked, UserDisliked };
