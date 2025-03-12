const Roles = require('../../models/role.model');

class RoleService {
    async getRoles() {
        return await Roles.findAll();
    }
}

module.exports = RoleService;
