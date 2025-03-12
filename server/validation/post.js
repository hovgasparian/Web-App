const Joi = require('joi');

const login = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.number().required()
});

module.exports = login;