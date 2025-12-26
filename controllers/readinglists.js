const router = require('express').Router()
const { ReadingList } = require('../models')
const { userExtractor } = require('../middleware/auth')

router.put('/:id', userExtractor, async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id)

  if (!entry || entry.userId !== req.user.id) {
    return res.status(403).json({ error: 'not allowed' })
  }

  entry.read = req.body.read
  await entry.save()

  res.json(entry)
})

module.exports = router
