const { Model, DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

class Preferences extends Model {}

Preferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.INTEGER,
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
