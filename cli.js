const sequelize = require('./utils/db')

const run = async () => {
  const blogs = await sequelize.query(
    'SELECT * FROM blogs',
    { type: sequelize.QueryTypes.SELECT }
  )

  blogs.forEach(blog => {
    console.log(
      `${blog.author}: '${blog.title}', ${blog.likes} likes`
    )
  })

  await sequelize.close()
}

run()
