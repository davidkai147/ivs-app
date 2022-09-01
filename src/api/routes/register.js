const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const { RegisterValidation } = require('../validations');
const validate = require('../middlewares/validate.js');
const { verifyToken } = require('../middlewares/ProtectAPI.js');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'OK',
    });
});
router.post(
    '/register',
    verifyToken(),
    validate(RegisterValidation.register),
    RegisterController.signUp
);
router.get('/get-all', verifyToken(), RegisterController.getAll);
router.get('/get/:id', verifyToken(), RegisterController.getName);

module.exports = router;
