const User = require('./User');
const Preferences = require('./Preferences');

// Define a Driver as having one License to create a foreign key in the `license` table
User.hasOne(Preferences, {
  foreignKey: 'user_id',
  // When we delete a Driver, make sure to also delete the associated License.
  onDelete: 'CASCADE',
});

// We can also define the association starting with License
Preferences.belongsTo(User, {
  foreignKey: 'user_id',
});

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { User, Preferences };



