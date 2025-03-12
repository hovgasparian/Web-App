const express = require('express');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const roleRouter = require('./roleRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/roles', roleRouter);

module.exports = router;