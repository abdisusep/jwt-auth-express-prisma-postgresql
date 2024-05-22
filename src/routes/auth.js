const express = require('express');
const router  = express.Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/protected', authMiddleware, (req, res) => {
	res.json({ message: 'This is a protected route' });
});

module.exports = router;