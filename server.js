const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// 1. Passport Configuration
// ==========================================
require("./config/passport")(passport);

// ==========================================
// 2. Database Connection (MongoDB)
// ==========================================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/student-portfolio-builder")
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// ==========================================
// 3. View Engine & Static Files Setup
// ==========================================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// 4. Session & Passport Middleware
// ==========================================
app.use(
    session({
        secret: process.env.SESSION_SECRET || "super-secret-key-student-portfolio",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ==========================================
// 5. Routes Setup
// ==========================================
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", portfolioRoutes);

// Root route redirect to login or dashboard
app.get("/", (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.redirect("/login");
});

// ==========================================
// 6. Start Server
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});