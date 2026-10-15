const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    // Link Portfolio with User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    // Profile
    profile: {
        fullName: {
            type: String,
            required: true
        },

        university: {
            type: String,
            default: ""
        },

        major: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        profilePicture: {
            type: String,
            default: ""
        }
    },

    // Skills
    skills: [{
        type: String
    }],

    // Achievements (Added image property for certificate/badge uploads)
    achievements: [{
        title: String,
        description: String,
        image: {
            type: String,
            default: ""
        }
    }],

    // Projects (Added image property for project screenshot uploads)
    projects: [{
        title: String,
        description: String,
        technologies: String,
        image: {
            type: String,
            default: ""
        }
    }],

    // Academics
    academics: [{
        subject: String,
        grade: String
    }],

    // Social Links
    socialLinks: {
        linkedin: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        twitter: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        }
    },

    // Selected Template
    selectedTheme: {
        type: String,
        enum: ["templateA", "templateB"],
        default: "templateA"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Portfolio", portfolioSchema);