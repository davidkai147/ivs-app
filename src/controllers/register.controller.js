const httpStatus = require('http-status');
const pick = require('../utils/pick.js');
const ApiError = require('../utils/apiError.js');
const catchAsync = require('../utils/catchAsync.js');
const { registerService } = require('../services');
const responseBuilder = require('../utils/responseBuilder.js');

/**
 * Sign up
 * @param {Object} signUpBody
 * @returns {Promise<Register>}
 */
const signUp = catchAsync(async (request, response) => {
    const register = await registerService.signUp(request.body);
    responseBuilder(
        response,
        httpStatus.CREATED,
        { register },
        'Signup successfully'
    );
});
/**
 * Get all
 * @return {Promise<Register>}
 */
const getAll = catchAsync(async (request, response) => {
    const options = pick(request.query, ['name', 'limit', 'page']);
    const list = await registerService.getAll(options);
    console.log(list);
    return responseBuilder(
        response,
        httpStatus.OK,
        list,
        'Get all successfully'
    );
});

const getName = catchAsync(async (request, response) => {
    const id = request.params.id;
    const options = pick(request.body, ['name', 'email']);
    const register = await registerService.getName(id, options);
    return responseBuilder(
        response,
        httpStatus.OK,
        register,
        'Get data successfully'
    );
});

module.exports = {
    signUp,
    getAll,
    getName,
};
