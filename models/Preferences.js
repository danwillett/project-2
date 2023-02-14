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
      allowNull: true,
    },
    is_vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
