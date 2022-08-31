const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const { RegisterValidation } = require('../validations');
const validate = require('../middlewares/validate.js');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'OK',
    });
});
router.post(
    '/register',
    validate(RegisterValidation.register),
    RegisterController.signUp
);

module.exports = router;
