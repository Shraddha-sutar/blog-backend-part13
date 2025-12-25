const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

// GET all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

// POST new blog
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE blog by id
router.delete('/:id', async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } })
  res.status(204).end()
})

module.exports = router
