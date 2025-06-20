const express = require("express")
const assetController = require("../controller/assetController")
const { signIn, rolesBasedAccess } = require("../middleware/authMiddleware");

const router = express.Router();

// route to create asset
router.post("/", signIn, rolesBasedAccess("Admin"), assetController.createAsset)

// routet to get asset
router.get("/", signIn, rolesBasedAccess("LogisticsOfficer", "Admin"), assetController.getAllAsset)

module.exports = router