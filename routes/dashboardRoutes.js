const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const isAuthenticated = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Use upload.any() to handle multiple dynamic image fields seamlessly
const upload = multer({ storage: storage });

router.get("/dashboard", isAuthenticated, dashboardController.getDashboard);
router.post("/dashboard", isAuthenticated, upload.any(), dashboardController.savePortfolio);

module.exports = router;