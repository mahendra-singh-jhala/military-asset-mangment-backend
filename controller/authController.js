const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const Base = require("../models/baseModel")

exports.register = async (req, res) => {
    const { role, baseId, name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            role,
            baseId,
            name,
            email,
            password: hashPassword
        })

        await newUser.save();

        await Base.findByIdAndUpdate(baseId, {
            $push: { user: newUser._id }
        })

        res.status(200).json({
            message: "User registered successfully and cart created",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error: User registered failed",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "Email Not found"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Password Not Match"
            })
        }

        const token = jwt.sign({ userId: user._id, email: user.email, baseId: user.baseId, role: user.role }, process.env.SECRET_KEY, { expiresIn: "7D" });
        res.json({
            message: "Login Successfully",
            user: {
                userId: user._id,
                email: user.email,
                baseId: user.baseId,
                role: user.role
            },
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "Error: User login failed",
            error: error.message
        })
    }
}

exports.getUserById = async (req, res) => {
    const userId = req.user.userId
    try {
        const user = await User.findOne({ _id: userId })
        .populate('baseId')
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "User fetch successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch user",
            error: error.message
        })
    }
}