const express = require("express")
const baseController = require("../controller/baseController")
const { signIn, rolesBasedAccess } = require("../middleware/authMiddleware")

const router = express.Router();

// Admin Route
// route create base
router.post("/", signIn, rolesBasedAccess("Admin"),  baseController.createBase)

// route to get base
router.get("/",signIn, rolesBasedAccess("Admin"), baseController.getBase)


// BaseCommander, LogisticsOfficer Route
// route to get base by Id
router.get("/:id", signIn, rolesBasedAccess("BaseCommander", "LogisticsOfficer", "Admin"),  baseController.getBaseById)


module.exports = router