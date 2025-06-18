const express = require("express")
const baseController = require("../controller/assetController")
const { signIn, rolesBasedAccess } = require("../middleware/authMiddleware");

const router = express.Router();

// route to create asset
router.post("/", signIn, rolesBasedAccess("Admin"), baseController.createAsset)

module.exports = router