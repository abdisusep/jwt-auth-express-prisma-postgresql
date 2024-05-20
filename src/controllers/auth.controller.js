const authService = require('../services/auth.service');

const login = async (req, res) => {
	res.send('Login')
}

const register = async (req, res) => {
	res.send('Register')
}

module.exports = { 
	login, register
}