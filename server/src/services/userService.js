const { Op } = require('sequelize');
const { Users, Roles, UserRoles, Posts } = require('../../models');
const { comparePassword, signToken } = require('../../utils/helper');

class UserSercice {
    async getUsers(search, sortFields, sortOrder) {
        const whereClause = search ? {
            [Op.or]: [
                {firstName: {[Op.iLike]: `%${search}%`}},
                {lastName: {[Op.iLike]: `%${search}%`}}
            ]
        } : {}

        const order =[[sortFields, sortOrder]];

        return await Users.findAll({
            where: whereClause,
            include: [
                {
                    model: Roles,
                    as: 'roles'
                },
                {
                    model: Posts,
                    as: 'posts'
                }
            ],
            order
        });
    }

    async getUserById(id) {
        return await Users.findByPk(id, {
            include: [
                { 
                    model: Roles, 
                    as: 'roles' 
                },
                {
                    model: Posts,
                    as: 'posts'
                }
            ]
        });
    }

    async getProfile(userId) {
        const user = await Users.findOne({
            where: {id: userId},
            include: [
                {
                    model: Roles,
                    as: 'roles'
                }
            ]
        });
        if(!user) throw new Error('User not found');

        const roles = user.roles.map((userRole) => userRole.name)

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
            roles
        }
    } 

    async registration(body) {
        const { firstName, lastName, age, email, password, roles=[] } = body;
        const userExist = await Users.findOne({where: {email}});
        if(userExist) throw new Error('User already exist');
        
        const user = await Users.create({
            firstName,
            lastName,
            age,
            email,
            password
        });

        Promise.all([
            ...roles.map(roleId => UserRoles.create({
                userId: user.id,
                roleId
            })),
        ]);

        return { user }
    }

    async login(body) {
        const user = await Users.findOne({
            where: { email: body.email },
            include: [
                {
                    model: Roles,
                    as: "roles",
                }
            ]
        });
    
        if (!user) throw new Error("User doesn't exist. Please sign up");
    
        const isPasswordValid = comparePassword(body.password, user.password);
        if (!isPasswordValid) throw new Error("Passwords don't match!");
    
        const roles = user.roles.map(role => role.name);
    
        const payload = {
            id: user.id,
            age: user.age,
            email: user.email,
            roles
        };
    
        const token = signToken(payload);
        return { user, token };
    }
    

}

module.exports = UserSercice;