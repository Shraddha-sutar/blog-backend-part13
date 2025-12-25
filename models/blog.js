const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const Blog = sequelize.define('Blog', {
  author: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

module.exports = Blog
