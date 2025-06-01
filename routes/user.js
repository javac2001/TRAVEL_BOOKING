const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/userModel.js');
const passport = require('passport');
const {userRedirectUrl} = require('../utils/middleware.js')
const userController = require('../controller/user.js')


// ============================================= SIGNUP
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', wrapAsync(userController.signUpUser));

// ============================================= LOGIN
router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', userRedirectUrl,passport.authenticate('local', { failureRedirect: '/stayfinder/login', failureFlash: true }), userController.loginUser);

// ============================================= LOGOUT
router.get('/logout', wrapAsync(userController.logOutUser))


module.exports = router;