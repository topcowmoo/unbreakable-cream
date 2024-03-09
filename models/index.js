const User = require('./User');
const Post = require('./post');
const Favorites = require('./Favorites');
const Like = require('./Like');
const Comment = require('./Comment');


// Build one-to-many relationship between User and Post.
User.hasMany(Post, {
  foreignKey: 'user_id',
});
// Build one-to-many relationship between User and Comment.
User.hasMany(Comment, {
  foreignKey: 'user_id',
});
// Build one-to-many relationship between User and Like.
User.hasMany(Like, {
  foreignKey: 'user_id',
});
// Build one-to-many relationship between User and Favorites.
User.hasMany(Favorites, {
  foreignKey: 'user_id',
});

// Build one-to-many relationship between Post and Comment.
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});
// Build one-to-many relationship between Post and Favorites.
Post.hasMany(Favorites, {
  foreignKey: 'post_id',
});
// Build one-to-many relationship between Post and Like.
Post.hasMany(Like, {
  foreignKey: 'post_id',
});

// Build many-to-one relationship between Post and User.
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Favorites, Comment, Like };