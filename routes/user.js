const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/userModel.js');
const passport = require('passport');


// ============================================= SIGNUP
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registrationUser = await User.register(newUser, password);
        console.log(registrationUser);
        req.flash("success", "Welcome to Stay Finder :)")
        res.redirect('/stayfinder')
    } catch (error) {
        req.flash('error', "User already exist")
        res.redirect('/stayfinder/signup'); 
    }
}));

// ============================================= LOGIN

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/stayfinder/login', failureFlash: true }), async (req, res) => {
    req.flash("success", "Welcome to Stay Finder :)")
    res.redirect('/stayfinder')
});


module.exports = router;