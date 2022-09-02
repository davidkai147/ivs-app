const express = require('express');
const { route } = require('../app');
const router = express.Router();
const RegisterController = require('../controllers/register.controller.js');
const { RegisterValidation } = require('../validations');
const validate = require('../middlewares/validate.js');
const { verifyToken } = require('../middlewares/protectAPI.js');

router.get('/', (req, res, next) => {
    res.render('register');
});
router.post(
    validate(RegisterValidation.register),
    RegisterController.signUp
);
router.get('/get-all', verifyToken(), RegisterController.getAll);
router.get('/get/:id', verifyToken(), RegisterController.getName);

module.exports = router;
