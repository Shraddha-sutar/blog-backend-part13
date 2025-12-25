const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const blogRouter = require('./controllers/blogs')
const errorHandler = require('./middleware/errorHandler')
const sequelize = require('./utils/db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/api/blogs', blogRouter)

// Test route
app.get('/', (req, res) => res.send('Blog API running'))

// Centralized error handling middleware (should be last)
app.use(errorHandler)

// Start server after syncing DB
const PORT = process.env.PORT || 3001
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
