const express = require('express');
const router = express.Router();
const { login, register, getUser } = require('../controllers/authController');
const { validate, validation } = require('../middleware/validation');
const { verifyToken } = require('../middleware/auth');

router.post('/login', [validate('login'), validation], login);
router.post('/register', [validate('register'), validation], register);
router.get('/me', verifyToken, getUser);

module.exports = router;
