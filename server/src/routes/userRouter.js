const express = require('express');
const UserController = require('../controllers/userController');
const { validation } = require('../../middleware/validation');
const registration = require('../../validation/registration');
const login = require('../../validation/login');
const AuthMiddleware = require('../../middleware/authmiddleware');
const CheckRoleMiddleware = require('../../middleware/CheckRoleMiddleware');
const controller = new UserController();
const router = express.Router();

router.get('/profile', AuthMiddleware, controller.getProfile);
router.get('/', AuthMiddleware, CheckRoleMiddleware(['Admin']), controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/registration', validation(registration), controller.registration);
router.post('/login', validation(login), controller.login);
router.put('/update/:id', AuthMiddleware, controller.updateUser);
router.delete('/:userIdToDelete', AuthMiddleware, CheckRoleMiddleware(['Admin']), controller.deleteUser);

module.exports = router;
