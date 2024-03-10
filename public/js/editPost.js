const sequelize = require('sequelize');
const { Post } = require('../../models'); // Assuming you have a Post model defined

const getTableData = async () => {
  try {
    const data = await Post.findByPk(6);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

getTableData();
