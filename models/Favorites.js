// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Favorites class extending Sequelize Model
class Favorites extends Model {}

// Initialize the Favorites model with defined properties and associations
Favorites.init(
  {
    // Define columns for the Favorites table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'post_id',
      },
    },
  },
  {
    // Configure the model with Sequelize options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  },
);

// Export the Favorites model
module.exports = Favorites;
