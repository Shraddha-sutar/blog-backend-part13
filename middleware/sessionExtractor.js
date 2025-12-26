const { Session, User } = require('../models')
const jwt = require('jsonwebtoken')

const sessionExtractor = async (req, res, next) => {
  try {
    const auth = req.get('authorization')
    if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'token missing' })
    }

    const token = auth.substring(7)
    const decoded = jwt.verify(token, process.env.SECRET)

    const session = await Session.findOne({ where: { token } })
    if (!session) return res.status(401).json({ error: 'invalid session' })

    const user = await User.findByPk(decoded.id)
    if (!user || user.disabled) return res.status(403).json({ error: 'user disabled' })

    req.user = user
    req.token = token
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { sessionExtractor }
