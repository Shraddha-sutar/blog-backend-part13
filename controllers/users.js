const router = require('express').Router()
const User = require('../models/user')

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// PUT /api/users/:username
router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username }})
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
