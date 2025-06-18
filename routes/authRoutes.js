const express = require("express")
const authController = require("../controller/authController")
const { signIn } = require("../middleware/authMiddleware")

const router = express.Router();

// register route
router.post("/register", authController.register)

// login route
router.post("/login", authController.login)

// fetch user by Id route
router.get("/", signIn, authController.getUserById)

module.exports = router