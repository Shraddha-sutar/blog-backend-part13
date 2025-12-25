const router = require('express').Router()
const sequelize = require('../utils/db')

router.get('/', async (req, res, next) => {
  try {
    const authors = await sequelize.query(`
      SELECT author,
             COUNT(*) AS articles,
             SUM(likes) AS likes
      FROM "Blogs"
      GROUP BY author
    `)

    res.json(authors[0])
  } catch (error) {
    next(error)
  }
})

module.exports = router
