module.exports = function ensureAuthenticated(req, res, next) {
    // Check if Passport has an active authenticated session
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next(); // User is logged in, let them pass to the dashboard
    }
    
    // User is NOT logged in, redirect them to login page
    res.redirect("/login");
};