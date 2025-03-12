const Joi = require('joi');

const registration = Joi.object({
    firstName: Joi.string().optional().allow(null),
    lastName: Joi.string().optional().allow(null),
    age: Joi.number().optional().allow(null),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.number()).min(1).required(),
});

module.exports = registration;