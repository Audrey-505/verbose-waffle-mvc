const {Model, DataTypes} = require('sequelize')

const sequelize = require('../config/connection')

class Posts extends Model {}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            references: {
                model: 'users',
                key: 'name',
                unique: false
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts'
    }
)

module.exports = Posts