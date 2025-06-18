const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

// Load environment variables
require("dotenv").config();

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

exports.isAdmin = async (req, res, next) => {
    const userId = req.user.userId
    try {
        const user = await User.findById(userId);
        if (user.role !== "Admin") {
            return res.status(401).send("Unauthorized");
        }
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Invalid token", 
            error: error.message 
        });
    }
}

exports.isBaseCommander = async (req, res, next) => {
    const userId = req.user.userId
    try {
        const user = await User.findById(userId);
        if (user.role !== "BaseCommander") {
            return res.status(401).send("Unauthorized");
        }
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Invalid token", 
            error: error.message 
        });
    }
}

exports.isLogisticsOfficer =  async (req, res, next) => {
    const userId = req.user.userId
    try {
        const user = await User.findById(userId);
        if (user.role !== "LogisticsOfficer") {
            return res.status(401).send("Unauthorized");
        }
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Invalid token", 
            error: error.message 
        });
    }
}