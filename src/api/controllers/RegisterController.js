const httpStatus = require('http-status');
const pick = require('../utils/pick.js');
const ApiError = require('../utils/ApiError.js');
const catchAsync = require('../utils/catchAsync');
const { registerService } = require('../services');
const responseBuilder = require('../utils/responseBuilder.js');

/**
 * Sign up
 * @param {Object} signUpBody
 * @returns {Promise<Register>}
 */
const signUp = catchAsync(async (request, response) => {
    const register = await registerService.signUp(request.body);
    console.log(register);
    responseBuilder(
        response,
        httpStatus.CREATED,
        { register },
        'Signup successfully'
    );
});

module.exports = {
    signUp,
};
