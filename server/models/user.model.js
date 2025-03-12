const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const { hashPassword } = require("../utils/helper");

class Users extends Model{}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  timestamps: true,
  modelName: 'users'
});

Users.addHook('beforeCreate', async (user, options) => {
  if(user.password) {
    user.password = await hashPassword(user.password);
  }
  });

Users.addHook('beforeUpdate', async (user, options) => {
  if(user.password) {
    user.password = await hashPassword(user.password);
  }
});


module.exports = Users;
