const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// POST /api/login
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username }})
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET)
    res.json({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = router
