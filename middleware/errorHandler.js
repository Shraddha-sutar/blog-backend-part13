const errorHandler = (err, req, res, next) => {
  console.error('🔥 ERROR NAME:', err.name)
  console.error('🔥 ERROR MESSAGE:', err.message)
  console.error('🔥 STACK:', err.stack)

  res.status(500).json({
    error: err.message,
  })
}

module.exports = errorHandler
