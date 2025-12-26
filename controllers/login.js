const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User, Session } = require('../models')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })

  if (!user || user.disabled) {
    return res.status(401).json({ error: 'invalid username or user disabled' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid password' })
  }

  const userForToken = { id: user.id, username: user.username }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

  // Save session
  await Session.create({ user_id: user.id, token })

  res.status(200).send({ token, username: user.username, id: user.id })
})

module.exports = router
