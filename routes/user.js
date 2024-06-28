const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
let router = express.Router({ mergeParams: true });
let User = require("../models/user");
const passport = require('passport');

// =================================== SIGNUP ===================================
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})
router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let registerUser = await new User({ username, email });
        let newUser = await User.register(registerUser, password);
        req.login(newUser, (err) => {
            if (err) {
                return next();
            }
            req.flash("success", "New user created");
            res.redirect("/listing");
        })
        console.log(newUser);
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))

// =================================== LOGIN ===================================
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function (req, res) {
        req.flash("success", "Welcome to wanderland")
        res.redirect('/listing');
    }
);

// =================================== LOGOUT ===================================
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            req.flash("error", "You are not able to logout");
            return next()
        } else {
            req.flash("success", "logout");
            res.redirect("/listing")
        }
    })
})


module.exports = router;