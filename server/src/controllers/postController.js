const { sendErrorResponse, sendSuccessResponse } = require("../../utils/helper");
const PostService = require("../services/postService");
const postService = new PostService();

class PostController {

    async getPosts(req, res) {
        try {
            const {search, sortBy, sortOrder} = req.query;
            const validSortBy = ['id', 'name', 'description'];
            const validSortOrder = ['ASC', 'DESC'];

            const validFields = validSortBy.includes(sortBy) ? sortBy : 'id';
            const validOrders = validSortOrder.includes(sortOrder?.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

            const posts = await postService.getPosts(search, validFields, validOrders);
            sendSuccessResponse(res, {posts});
        } catch (error) {
            sendErrorResponse(res, error.message);
        }
    }

    async getPostById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            sendSuccessResponse(res, {post});
        } catch (error) {
            sendErrorResponse(res, error.message);
        }
    }

    async createPost(req, res) {
        try {
            const post = await postService.createPost(req.body);
            sendSuccessResponse(res, {post});
        } catch (error) {
            sendErrorResponse(res, error.message)
        }
    }
}

module.exports = PostController