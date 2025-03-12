const { SECRET_WORD } = require("../utils/constants");
const { sendErrorResponse } = require("../utils/helper");

const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return sendErrorResponse(res, 'Invalid Token');

    try {
        const decoded = jwt.verify(token, SECRET_WORD); 
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
}

module.exports = AuthMiddleware;

