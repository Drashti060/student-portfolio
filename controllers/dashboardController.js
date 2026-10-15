const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

// ==========================================
// 1. GET: Load the Dashboard
// ==========================================
exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.session.user._id;

        let portfolio = await Portfolio.findOne({ user: userId });

        if (!portfolio) {
            portfolio = {
                profile: { fullName: req.user ? req.user.name : "Edufolio User", university: "", major: "", bio: "", profilePicture: "" },
                skills: [],
                projects: [],
                academics: [],
                achievements: [],
                socialLinks: {},
                selectedTheme: "templateA"
            };
        }

        res.render("dashboard/index", { 
            user: req.user || req.session.user,
            portfolio: portfolio 
        });

    } catch (error) {
        console.error("Dashboard Load Error:", error);
        res.status(500).send("Server Error loading the dashboard.");
    }
};

// ==========================================
// 2. POST: Save/Update Portfolio Data (Multiple Projects, Achievements & Selected Theme)
// ==========================================
exports.savePortfolio = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.session.user._id;

        const { fullName, university, major, bio, subject, grade, linkedin, github, twitter, website, selectedTheme } = req.body;

        // Skills Formatting
        const skills = req.body.skills ? 
            (Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim())).filter(s => s && s !== '') 
            : [];

        // Files handling from upload.any()
        const files = req.files || [];
        
        const profilePicFile = files.find(f => f.fieldname === 'profilePicture');
        const profilePicturePath = profilePicFile ? `/uploads/${profilePicFile.filename}` : null;

        const projectImageFiles = files.filter(f => f.fieldname === 'projectImages');
        const achievementImageFiles = files.filter(f => f.fieldname === 'achievementImages');

        // ==========================================
        // Projects Array Processing (One-to-Many)
        // ==========================================
        const projectTitles = req.body.projectTitle || [];
        const projectDescriptions = req.body.projectDescription || [];
        const technologies = req.body.technologies || [];
        
        const projects = [];
        const pTitles = Array.isArray(projectTitles) ? projectTitles : [projectTitles];
        const pDescs = Array.isArray(projectDescriptions) ? projectDescriptions : [projectDescriptions];
        const pTechs = Array.isArray(technologies) ? technologies : [technologies];

        for (let i = 0; i < pTitles.length; i++) {
            if (pTitles[i] && pTitles[i].trim() !== '') {
                let imgPath = "";
                if (projectImageFiles[i]) {
                    imgPath = `/uploads/${projectImageFiles[i].filename}`;
                }

                projects.push({
                    title: pTitles[i],
                    description: pDescs[i] || '',
                    technologies: pTechs[i] || '',
                    image: imgPath
                });
            }
        }

        // ==========================================
        // Achievements Array Processing (One-to-Many)
        // ==========================================
        const achievementTitles = req.body.achievementTitle || [];
        const achievementDescriptions = req.body.achievementDescription || [];
        
        const achievements = [];
        const aTitles = Array.isArray(achievementTitles) ? achievementTitles : [achievementTitles];
        const aDescs = Array.isArray(achievementDescriptions) ? achievementDescriptions : [achievementDescriptions];

        for (let i = 0; i < aTitles.length; i++) {
            if (aTitles[i] && aTitles[i].trim() !== '') {
                let achImgPath = "";
                if (achievementImageFiles[i]) {
                    achImgPath = `/uploads/${achievementImageFiles[i].filename}`;
                }

                achievements.push({
                    title: aTitles[i],
                    description: aDescs[i] || '',
                    image: achImgPath
                });
            }
        }

        // Academics & Social Links
        const academics = subject && subject.trim() !== '' ? [{ subject, grade: grade || '' }] : [];
        const socialLinks = { linkedin: linkedin || '', github: github || '', twitter: twitter || '', website: website || '' };

        const updateData = {
            "profile.fullName": fullName,
            "profile.university": university,
            "profile.major": major,
            "profile.bio": bio,
            skills,
            projects,
            achievements,
            academics,
            socialLinks,
            selectedTheme: selectedTheme || "templateA"
        };

        if (profilePicturePath) {
            updateData["profile.profilePicture"] = profilePicturePath;
        }

        // Save to Database and return the updated portfolio document
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            { returnDocument: 'after', upsert: true }
        );

        // Redirect dynamically to whichever template the user chose in the dropdown
        const themeToRender = updatedPortfolio.selectedTheme || "templateA";
        res.redirect("/portfolio/" + themeToRender);

    } catch (error) {
        console.error("Dashboard Save Error:", error);
        res.status(500).send("Error saving your portfolio data.");
    }
};