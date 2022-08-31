const httpStatus = require('http-status');
const { Register } = require('../models/index.js');
const sequelize = require('../database/connection.js');
const ApiError = require('../utils/ApiError.js');

const signUp = async (signUpBody) => {
    if (await isEmailTaken(signUpBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    try {
        return await sequelize.transaction(async (t) => {
            return await Register.create(signUpBody, { transaction: t });
        });
    } catch (error) {
        console.log('Cannot sign up');
    }
};

const isEmailTaken = async (email) => {
    return Register.findOne({
        where: {
            email: email,
        },
    });
};

module.exports = {
    signUp,
    isEmailTaken,
};
