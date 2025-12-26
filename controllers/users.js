const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')
const bcrypt = require('bcrypt')

// ---------------------------------
// POST /api/users
// Create a new user
// ---------------------------------
router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' })
    }

    // Hash password before storing
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({
      username,
      name,
      password: passwordHash,
    })

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

// ---------------------------------
// GET /api/users/:id
// Get single user + reading list
// Supports filter ?read=true / false
// ---------------------------------
router.get('/:id', async (req, res, next) => {
  try {
    const where = {}

    if (req.query.read) {
      where.read = req.query.read === 'true'
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'name'],
      include: {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'title', 'author', 'url', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'],
          where,
        },
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
