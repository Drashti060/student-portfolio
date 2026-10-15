const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const isAuthenticated = require("../middleware/auth");

// Template selection page
router.get("/templates", isAuthenticated, portfolioController.getTemplatesPage);
router.post("/templates", isAuthenticated, portfolioController.saveSelectedTemplate);

// Direct template preview routes for logged-in users (supports both paths)
router.get("/portfolio/templateA", isAuthenticated, portfolioController.renderTemplateA);
router.get("/portfolio/preview/templateA", isAuthenticated, portfolioController.renderTemplateA); // <-- Added for safety

router.get("/portfolio/templateB", isAuthenticated, portfolioController.renderTemplateB);
router.get("/portfolio/preview/templateB", isAuthenticated, portfolioController.renderTemplateB); // <-- Added for safety

// PDF Download Route
router.get("/portfolio/download", isAuthenticated, portfolioController.downloadPortfolioPDF);

// Public dynamic portfolio view by username
router.get("/portfolio/:username", portfolioController.getPublicPortfolio);

module.exports = router;