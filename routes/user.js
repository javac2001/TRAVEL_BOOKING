const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
let router = express.Router({ mergeParams: true });
let User = require("../models/user");
const passport = require('passport');

// =================================== SIGNUP ===================================
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let registerUser = await new User({ username, email });
        let newUser = await User.register(registerUser, password);
        console.log(newUser);
        req.flash("success", "New user created");
        res.redirect("/listing");
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
    });

module.exports = router;