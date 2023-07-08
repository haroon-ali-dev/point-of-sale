const Joi = require("joi");

function validate(order) {
    const schema = Joi.object({
        uId: Joi.number().positive().integer().required(),
        cart: Joi.array().items(Joi.object({
            pId: Joi.string().required(),
            name: Joi.string().min(3).max(50).required(),
            price: Joi.number().positive().precision(2).min(0.01).required(),
            quantity: Joi.number().positive().integer().min(1).required()
        })).min(1).required(),
        total: Joi.number().positive().precision(2).min(0.01).required()
    });

    return schema.validate(order, { convert: false });
}

module.exports = validate;