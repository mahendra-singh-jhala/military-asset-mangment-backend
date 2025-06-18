const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

// Load environment variables
require("dotenv").config();

// middleware user signIn
exports.signIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header is missing"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token is missing"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
}

// middleware user role based access
exports.rolesBasedAccess = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.userId);
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Unauthorized"
                })
            }
            next();
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    };
};