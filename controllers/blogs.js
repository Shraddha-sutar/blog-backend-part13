const router = require('express').Router()
const { Op } = require('sequelize')
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const { search } = req.query

  let where = {}

  if (search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } }
      ]
    }
  }

  const blogs = await Blog.findAll({
    where,
    order: [['likes', 'DESC']]
  })

  res.json(blogs)
})



module.exports = router
