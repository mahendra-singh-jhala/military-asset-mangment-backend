const express = require("express")
const authController = require("../controller/authController")
const { signIn } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register", authController.register)

router.post("/login", authController.login)

router.get("/", signIn, authController.getUserById)

module.exports = router