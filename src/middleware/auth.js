const jwt = require('jsonwebtoken');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendErrorResponse(res, { 
            message: 'Unauthorized: Invalid token format' 
        }, 401);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            const errorMessage = err.name === 'TokenExpiredError' 
                ? 'Forbidden: Token has expired' 
                : 'Forbidden: Invalid token';

            return sendErrorResponse(res, { 
                message: errorMessage 
            }, 403);
        }

        req.user = decoded;
        next();
    });
};

module.exports = auth;
