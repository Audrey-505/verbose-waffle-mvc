const Posts = require('./Posts')
const Users = require('./Users')

Users.hasMany(Posts, {
    foreignKey: 'userame',
    onDelete: 'CASCADE'
})

Posts.belongsTo(Users, {
    foreignKey: 'username',
})

module.exports = {
    Posts,
    Users
}