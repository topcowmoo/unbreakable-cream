const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Post ID (Primary key, foreign key)
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Post title
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Ensures title valid
      },
    },
    // Post content
    post_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // Ensures content valid
      },
    },
    // User ID (Foreign Key)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Refer to the User model
        key: 'id', // Refer to the id column in User model
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  },
);

module.exports = Post;
