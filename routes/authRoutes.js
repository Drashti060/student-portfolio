const express = require("express");
const router = express.Router();

// Import the controller we just built
const authController = require("../controllers/authController");

// ==========================================
// Authentication Routes
// ==========================================

// Render the forms
router.get("/login", authController.getLoginPage);
router.get("/register", authController.getRegisterPage);

// Handle form submissions
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Handle logout
router.get("/logout", authController.logoutUser);

module.exports = router;