const { Op } = require("sequelize");
const Posts = require("../../models/posts.model");
const Users = require('../../models/user.model');

class PostService {

    async getPosts(search, validFields, validOrders) {
        let whereClause = search ? {
            [Op.or]: [
                {name: {[Op.iLike]: `%${search}%`}}
            ]
        } : {};

        const order = [[validFields, validOrders]]

        return await Posts.findAll({
            where: whereClause,
            include: [
                {
                    model: Users,
                    as: 'users'
                }
            ],
            order
        });

    }

    async getPostById(id) {
        return await Posts.findByPk(id, {
            include: [
                {
                    model: Users,
                    as: 'users'
                }
            ]
        });
    }

    async createPost(body) {
        const { name, description, userId } = body
        const user = await Users.findByPk(userId);
        if(!user) throw new Error('User doesnt exist');

        return await Posts.create({
            name,
            description,
            userId: user.id
        })
    }
}

module.exports = PostService;
