const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

// GET all blogs
router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

// POST a new blog
router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

// DELETE a blog
router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT /api/blogs/:id - update likes
router.put('/:id', async (req, res, next) => {
  try {
    const { likes } = req.body
    if (likes === undefined) {
      return res.status(400).json({ error: 'likes field is required' })
    }

    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    blog.likes = likes
    await blog.save()

    res.json(blog)
  } catch (error) {
    next(error) // forward to centralized error handler
  }
})

module.exports = router
