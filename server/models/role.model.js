const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/database');

class Roles extends Model {}
Roles.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'roles',
    timestamps: true
});



module.exports = Roles;
