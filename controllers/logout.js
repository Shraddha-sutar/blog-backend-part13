const router = require('express').Router()
const { Session } = require('../models')
const { sessionExtractor } = require('../middleware/sessionExtractor')

router.delete('/', sessionExtractor, async (req, res) => {
  await Session.destroy({ where: { token: req.token } })
  res.status(204).end()
})

module.exports = router
