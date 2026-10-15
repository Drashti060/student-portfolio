const puppeteer = require("puppeteer");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

// Helper to safely get the current user's ID regardless of auth strategy
const getUserId = (req) => {
    return req.user ? req.user._id : (req.session && req.session.user ? req.session.user._id : null);
};

// ===============================
// Show Template Selection Page
// ===============================
exports.getTemplatesPage = (req, res) => {
    res.render("templates/templates");
};

// ===============================
// Save Selected Template
// ===============================
exports.saveSelectedTemplate = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) return res.redirect("/login");

        await Portfolio.findOneAndUpdate(
            { user: userId },
            { selectedTheme: req.body.selectedTheme },
            { new: true, upsert: true }
        );

        const user = await User.findById(userId);
        res.redirect("/portfolio/" + encodeURIComponent(user.name));
    } catch (err) {
        console.error("Template Selection Error:", err);
        res.send("Error Selecting Template");
    }
};

// ===============================
// Direct Preview: Template A (Logged-in User)
// ===============================
exports.renderTemplateA = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) return res.redirect("/login");

        const portfolio = await Portfolio.findOne({ user: userId });
        if (!portfolio) {
            return res.status(404).send("Portfolio data not found. Please fill out your dashboard first!");
        }

        res.render("templates/templateA", { portfolio });
    } catch (err) {
        console.error("Template A Preview Error:", err);
        res.status(500).send("Server Error loading Template A");
    }
};

// ===============================
// Direct Preview: Template B (Logged-in User)
// ===============================
exports.renderTemplateB = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) return res.redirect("/login");

        const portfolio = await Portfolio.findOne({ user: userId });
        if (!portfolio) {
            return res.status(404).send("Portfolio data not found. Please fill out your dashboard first!");
        }

        res.render("templates/templateB", { portfolio });
    } catch (err) {
        console.error("Template B Preview Error:", err);
        res.status(500).send("Server Error loading Template B");
    }
};

// ===============================
// Public Portfolio (By Username Route: /portfolio/:username)
// ===============================
exports.getPublicPortfolio = async (req, res) => {
    try {
        const username = decodeURIComponent(req.params.username);
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.send("User Not Found");
        }

        const portfolio = await Portfolio.findOne({ user: user._id });

        if (!portfolio) {
            return res.send("Portfolio Not Found");
        }

        if (portfolio.selectedTheme === "templateA") {
            return res.render("templates/templateA", { portfolio });
        } else {
            return res.render("templates/templateB", { portfolio });
        }
    } catch (err) {
        console.error("Public Portfolio Error:", err);
        res.send("Server Error");
    }
};

// ===============================
// Download Portfolio PDF
// ===============================
exports.downloadPortfolioPDF = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) return res.redirect("/login");

        const user = await User.findById(userId);

        if (!user) {
            return res.send("User Not Found");
        }

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        const PORT = process.env.PORT || 3001;

        await page.goto(
            `http://localhost:${PORT}/portfolio/${encodeURIComponent(user.name)}`,
            { waitUntil: "networkidle0" }
        );

        // Hide elements with class "no-print" (like buttons and navbars)
        await page.emulateMediaType("print");

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20px",
                bottom: "20px",
                left: "20px",
                right: "20px"
            }
        });

        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=Portfolio.pdf");

        res.send(pdf);
    } catch (err) {
        console.error("PDF Error:", err);
        res.status(500).send(err.message);
    }
};