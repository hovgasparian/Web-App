const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/database');

class Posts extends Model {}

Posts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
},
{
    sequelize,
    modelName: 'posts',
    timestamps: true
});

module.exports = Posts;
