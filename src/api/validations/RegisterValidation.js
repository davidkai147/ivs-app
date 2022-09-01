const Joi = require('joi');
const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required(),
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
