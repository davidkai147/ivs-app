const Joi = require('joi');
const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email().messages({
            'any.required': 'Please input email',
            'string.email': 'Please input correct email format',
        }),
        name: Joi.string().required().messages({
            'any.required': 'Please input name',
        }),
    }),
};

const getName = {
    param: {
        id: Joi.required(),
    },
};

module.exports = {
    register,
    getName,
};
