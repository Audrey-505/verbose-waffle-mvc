const sequelize = require('../config/connection')
const {Post, User, Comment} = require('../models')

const userData = require('./userData.json')
const postData = require('./postsData.json')
const commentData = require('./commentData.json')

const seedDatabase = async ()  => {
    await sequelize.sync({ force: true })

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
})

console.log(users)

for (const post of postData) {
    await Post.create({
      ...post,
      //id: users[Math.floor(Math.random() * users.length)].id,
      id: users.id
    });
  }

 for (const comment of commentData) {
  await Comment.create({
    ...comment,
    id: users.id
  })
 }

  process.exit(0);
}

seedDatabase();