const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

// ==========================================
// 1. GET: Render Login & Register Pages
// ==========================================
exports.getLoginPage = (req, res) => {
    // If the user is already logged in, redirect straight to the dashboard
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.render("auth/login");
};

exports.getRegisterPage = (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.render("auth/register");
};

// ==========================================
// 2. POST: Handle User Registration
// ==========================================
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Normalize email to lowercase and trim spaces
        const normalizedEmail = email ? email.toLowerCase().trim() : "";

        // Check if user already exists (case-insensitive query)
        let existingUser = await User.findOne({ 
            email: { $regex: new RegExp("^" + normalizedEmail + "$", "i") } 
        });
        
        if (existingUser) {
            return res.send("A user with that email already exists. Please log in.");
        }

        // Hash the password securely using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user to MongoDB
        const newUser = new User({
            name: name,
            email: normalizedEmail,
            password: hashedPassword
        });

        await newUser.save();

        // Redirect to login page after successful registration
        res.redirect("/login");

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send("Server Error during registration.");
    }
};

// ==========================================
// 3. POST: Handle User Login
// ==========================================
exports.loginUser = passport.authenticate("local", {
    successRedirect: "/dashboard", // Redirect on successful login
    failureRedirect: "/login",     // Redirect back to login on failure
    failureFlash: false            // Set to true if using connect-flash
});

// ==========================================
// 4. GET: Handle User Logout
// ==========================================
exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            return next(err); 
        }
        
        // Destroy session completely and clear cookie
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect("/login");
        });
    });
};