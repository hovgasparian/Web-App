const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const controller = new RoleController();

router.get('/', controller.getRoles);

module.exports = router;
