const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./utils/db')
const blogRouter = require('./controllers/blogs')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)

// Test route
app.get('/', (req, res) => {
  res.send('Blog API is running')
})

// Start server
const PORT = process.env.PORT || 3001
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
