const { Model, DataTypes, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

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
            type: DataType.STRING
          },
         
          price: {
            type: DataType.INTEGER
      
          },
        
      
         
          is_vegetarian: {
            type: DataType.boolean
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
            
          
    },
{ 
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'Preferences',
}
);
module.exports = Preferences ;