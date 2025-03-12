const express = require('express');
const PostController = require('../controllers/postController');
const controller = new PostController();
const router = express.Router();

router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
router.post('/', controller.createPost);

module.exports = router;
