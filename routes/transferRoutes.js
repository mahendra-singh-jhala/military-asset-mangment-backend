const express = require("express")
const transferController = require("../controller/transferController")
const { signIn, rolesBasedAccess } = require("../middleware/authMiddleware")

const router = express.Router();

// LogisticsOfficer Route
// route to tranfser asset
router.post("/", signIn, rolesBasedAccess("LogisticsOfficer", "Admin"), transferController.transferAsset)

module.exports = router