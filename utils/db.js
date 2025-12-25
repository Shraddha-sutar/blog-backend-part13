const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log
})

sequelize.authenticate()
  .then(() => console.log('✅ DB connection established'))
  .catch(err => console.error('❌ Connection error:', err))

module.exports = sequelize