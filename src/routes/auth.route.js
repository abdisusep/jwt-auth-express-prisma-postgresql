const express = require('express');
const router  = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/login', (req, res) => {
  res.send('Login')
});

module.exports = router;