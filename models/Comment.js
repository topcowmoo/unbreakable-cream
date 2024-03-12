// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create model for Comments
class Comment extends Model {}

// Initialize the Comment model with defined properties and associations
Comment.init(
  {
    // Define columns for the Comment table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  },
);

// Export the Comment model
module.exports = Comment;
