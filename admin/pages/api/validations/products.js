const Joi = require("joi");

function validate(product) {
    const schema = Joi.object({
        uId: Joi.number().positive().integer().required(),
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().positive().precision(2).min(0.01).max(10.00).required(),
        quantity: Joi.number().positive().integer().min(1).required()
    });

    return schema.validate(product, { convert: false });
}

module.exports = validate;