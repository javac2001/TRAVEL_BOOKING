const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/userModel.js');
const passport = require('passport');
const {userRedirectUrl} = require('../utils/middleware.js')


// ============================================= SIGNUP
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registrationUser = await User.register(newUser, password);
        req.login(registrationUser, (err) => {
            if (err) { return next(err); }
            req.flash("success", "Welcome to Stay Finder :)")
            res.redirect('/stayfinder')
        });
    } catch (error) {
        req.flash('error', "User already exist")
        res.redirect('/stayfinder/signup');
    }
}));

// ============================================= LOGIN
router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', userRedirectUrl,passport.authenticate('local', { failureRedirect: '/stayfinder/login', failureFlash: true }), async (req, res) => {
    if(res.locals.redirectUrl){
        req.flash("success", "Welcome to Stay Finder :)")
        return res.redirect(res.locals.redirectUrl)
    }else{
        res.redirect('/stayfinder')
    }

});

// ============================================= LOGOUT
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "Successfully logout")
        res.redirect('/stayfinder')
    })
})


module.exports = router;