const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Disliked extends Model {}

Disliked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Disliked",
  }
);
module.exports = Liked;
