const httpStatus = require('http-status');
const { Register } = require('../models/index.js');
const sequelize = require('../database/connection.js');
const ApiError = require('../utils/apiError.js');

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

const getAll = async (options) => {
    var condition = options.name
        ? { name: { [Op.like]: `%${options.name}%` } }
        : null;
    const { limit, offset } = getPagination(options.page, options.limit);
    return Register.findAndCountAll({
        attributes: ['name'],
        where: condition,
        limit,
        offset,
    })
        .then((data) => {
            return getPagingData(data, options.page, limit);
        })
        .catch((err) => {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Cannot get all names'
            );
        });
};

const getName = async (id, options) => {
    return Register.findByPk(id, {
        attributes: ['name', 'email'],
    });
};

const isEmailTaken = async (email) => {
    return Register.findOne({
        where: {
            email: email,
        },
    });
};

const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: register } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, register, totalPages, currentPage };
};

module.exports = {
    signUp,
    isEmailTaken,
    getAll,
    getName,
};
