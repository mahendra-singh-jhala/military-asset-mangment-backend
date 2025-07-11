const express = require("express")
const purchaseController = require("../controller/purchaseController")
const { signIn, rolesBasedAccess } = require("../middleware/authMiddleware")

const router = express.Router();

// LogisticsOfficer Route
// route to create order
router.post("/", signIn, rolesBasedAccess("LogisticsOfficer"), purchaseController.createOrder)

// route to get order
router.get("/:id", signIn, rolesBasedAccess("LogisticsOfficer", "Admin"), purchaseController.getOrderById)

module.exports = router