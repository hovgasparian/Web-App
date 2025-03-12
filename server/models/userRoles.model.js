const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/database');

class UserRoles extends Model {}

UserRoles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "userRoles",
    timestamps: true,
  }
);

module.exports = UserRoles;
