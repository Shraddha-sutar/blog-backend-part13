require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')

const errorHandler = require('./middleware/errorHandler')
const { sequelize, connectToDatabase } = require('./utils/db')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/authors', authorsRouter)

// Test route
app.get('/', (req, res) => {
  res.send('Blog API running')
})

// Error handler (ALWAYS last)
app.use(errorHandler)

// ✅ Correct startup pattern
const start = async () => {
  try {
    await connectToDatabase()
    await sequelize.sync()

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

start()
