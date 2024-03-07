// Import models and data
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// Establish sequelize connection
const sequelize = require('../config/connection');

// Seed all the models
const seedAll = async() =>{
  await sequelize.sync({force: true});

  await User.bulkCreate(userData, {
    // Enables execution of model lifecycle hooks for each individual instance being created
    individualHooks: true,
    // Ensures that the created users are returned as a result value
    returning: true
  });

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedAll();