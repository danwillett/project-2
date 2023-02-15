const User = require('./User');
const Preferences = require('./Preferences');
const Disliked = require('./Disliked')
const UserDisliked = require('./UserDisliked')

User.hasOne(Preferences, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Preferences.belongsTo(User, {
  foreignKey: 'user_id',
});

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
