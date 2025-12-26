const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./readinglist')

User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'readings',
})

Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'users',
})

module.exports = {
  User,
  Blog,
  ReadingList,
}
