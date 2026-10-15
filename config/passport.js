const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { 
                usernameField: "email", 
                passwordField: "password" 
            }, 
            async (email, password, done) => {
                try {
                    const normalizedEmail = email ? email.toLowerCase().trim() : "";
                    
                    // Case-insensitive search ($regex with "i") matches regardless of uppercase/lowercase in DB
                    const user = await User.findOne({ 
                        email: { $regex: new RegExp("^" + normalizedEmail + "$", "i") } 
                    });
                    
                    if (!user) {
                        return done(null, false, { message: "That email is not registered." });
                    }

                    const isMatch = await bcrypt.compare(password, user.password);
                    
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password incorrect." });
                    }
                } catch (error) {
                    console.error("Passport Authentication Error:", error);
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};