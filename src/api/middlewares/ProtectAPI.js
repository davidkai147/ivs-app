const responseBuilder = require('../utils/ResponseBuilder.js');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyToken = () => (req, res, next) => {
    const token = req.headers['x-ivs-token'];
    if (token == null)
        return responseBuilder(
            res,
            httpStatus.UNAUTHORIZED,
            {},
            'Token is missing'
        );

    try {
        if (token !== process.env.SECRET_KEY) {
            return responseBuilder(
                res,
                httpStatus.UNAUTHORIZED,
                'Token is not correct'
            );
        }
        next(); // pass the execution off to whatever request the client intended
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Cannot verify token');
    }
};

module.exports = {
    verifyToken,
};
