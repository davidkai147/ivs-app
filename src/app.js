const express = require('express');
var app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const xss = require('xss-clean');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware
app.use(helmet());
app.use(morgan('combined'));
// compress responses
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(xss());
app.use(cors());
app.options('*', cors());

//router
app.use(require('./api/routes'));

//Error Handling Middleware called
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = httpStatus.NOT_FOUND;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({
        error: {
            status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'Internal Server Error',
        },
    });
});

module.exports = app;
