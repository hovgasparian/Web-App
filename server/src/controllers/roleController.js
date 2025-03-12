const { sendErrorResponse, sendSuccessResponse } = require("../../utils/helper");
const RoleService = require('../services/roleService');
const roleService = new RoleService();

class RoleController {
    async getRoles(req, res) {
        try {
            const roles = await roleService.getRoles();            
            sendSuccessResponse(res, {roles})
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }
}

module.exports = RoleController;
