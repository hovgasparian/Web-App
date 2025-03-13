const {sendSuccessResponse, sendErrorResponse} = require('../../utils/helper');

const UserSercice = require('../services/userService');
const userService = new UserSercice();

class UserController {
    async getUsers(req, res) {
        try {
            const {search, sortBy, sortOrder} = req.query;
            
            const validSortByFields = ['id', 'firstName', 'lastName', 'age', 'email'];
            const validSortOrder = ['ASC', 'DESC'];

            const validFields = validSortByFields.includes(sortBy) ? sortBy : 'id';
            const validOrder = validSortOrder.includes(sortOrder?.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

            const users = await userService.getUsers(search, validFields, validOrder);
            sendSuccessResponse(res, {users})
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            sendSuccessResponse(res, {user});
        } catch (error) {
            sendErrorResponse(res, error.message);
        }
    }

    async getProfile(req, res) {
        try {
            const profile = await userService.getProfile(req.user.id);
            sendSuccessResponse(res, {profile});
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }
    
    async registration(req, res) {
        try {
            const user = await userService.registration(req.body);
            sendSuccessResponse(res, {user});
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }

    async login(req, res) {
        try {
            const user = await userService.login(req.body);
            sendSuccessResponse(res, {user});
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }

    async updateUser(req, res) {
        try {
            const {id} = req.user;
            const user = await userService.updateUser(id, req.body);
            sendSuccessResponse(res, {user});
        } catch (error) {
            sendErrorResponse(res, error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.params;
            const result = await userService.deleteUser(id);
            sendSuccessResponse(res, {result});
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }
}

module.exports = UserController;
