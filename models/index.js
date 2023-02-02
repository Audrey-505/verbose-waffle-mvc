const Post = require('./Post')
const User = require('./User')

User.hasMany(Post, {
    foreignKey: 'userame',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
    foreignKey: 'username',
})

module.exports = {
    Post,
    User
}