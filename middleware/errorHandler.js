const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map(e => e.message) })
  }

  res.status(500).json({ error: 'Something went wrong' })
}

module.exports = errorHandler
