const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Preferences model with id, city, state, and user_id fields.
// The other fields will be used in future development as additional filters

class Preferences extends Model {}

Preferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    favoriteCuisine: {
      type: DataTypes.STRING,
    },
    is_vegetarian: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Preferences",
  }
);
module.exports = Preferences;
