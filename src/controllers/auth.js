const authService = require('../services/auth');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

const login = async (req, res) => {
	try {
		const result = await authService.login(req.body);
		sendSuccessResponse(res, result);
	} catch (err) {
		sendErrorResponse(res, err, 400);
	}
}

const register = async (req, res) => {
	try {
		const result = await authService.register(req.body);
		sendSuccessResponse(res, result);
	} catch (err) {
		sendErrorResponse(res, err, 400);
	}
}

module.exports = { login, register }