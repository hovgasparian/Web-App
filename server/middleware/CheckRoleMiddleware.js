const { Users, Roles } = require('../models');

const CheckRoleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await Users.findOne({
        where: { id: userId },
        include: [
          {
            model: Roles,
            as: 'roles'
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      const roles = user.roles.map(role => role.name);

      const hasPermission = roles.some(role => allowedRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ success: false, error: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('Error in CheckRoleMiddleware:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
};

module.exports = CheckRoleMiddleware;

