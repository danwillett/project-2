const sequelize = require('../config/connection');
const { User, Preferences } = require('../models');

const userData = require('./userData.json');
const preferencesData = require('./preferencesData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Preferences.bulkCreate(preferencesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
