const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'OK',
    });
});
router.post('/register', RegisterController.signUp);

module.exports = router;
