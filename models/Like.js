// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Like class extending Sequelize Model
class Like extends Model {}

// Initialize the Like model with defined properties and associations
Like.init(
  {
    // Define columns for the Like table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'likes',
  },
);

// Export the Like model
module.exports = Like;
