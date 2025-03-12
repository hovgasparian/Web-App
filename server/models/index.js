const Users = require('./user.model');
const Roles = require('./role.model');
const UserRoles = require('./userRoles.model');
const Posts = require('./posts.model');

// Many-to-Many Associations
Users.belongsToMany(Roles, { through: UserRoles, foreignKey: "userId", as: 'roles'});
Roles.belongsToMany(Users, { through: UserRoles, foreignKey: "roleId", as: 'users'});

// One-to-Many Associations
Users.hasMany(Posts, { foreignKey: "userId", as: 'posts' });
Posts.belongsTo(Users, { foreignKey: "userId", as: 'users' });


module.exports = { Users, Roles, UserRoles, Posts };