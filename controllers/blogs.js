const router = require('express').Router()
const { Op } = require('sequelize')
const Blog = require('../models/blog')

// GET /api/blogs - fetch all blogs, optional search
router.get('/', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

// POST /api/blogs - create new blog
router.post('/', async (req, res, next) => {
  try {
    const { author, title, url, likes, year } = req.body

    // year validation: 1991 <= year <= current year
    const currentYear = new Date().getFullYear()
    if (year < 1991 || year > currentYear) {
      return res.status(400).json({ error: 'Year must be between 1991 and current year' })
    }

    const newBlog = await Blog.create({ author, title, url, likes: likes || 0, year })
    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

// PUT /api/blogs/:id - update likes or year
router.put('/:id', async (req, res, next) => {
  try {
    const { likes, year } = req.body
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    if (likes !== undefined) blog.likes = likes
    if (year !== undefined) {
      const currentYear = new Date().getFullYear()
      if (year < 1991 || year > currentYear) {
        return res.status(400).json({ error: 'Year must be between 1991 and current year' })
      }
      blog.year = year
    }

    await blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/blogs/:id - delete a blog
router.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
