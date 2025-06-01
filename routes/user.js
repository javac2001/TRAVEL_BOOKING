const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/userModel.js');
const passport = require('passport');
const {userRedirectUrl} = require('../utils/middleware.js')
const userController = require('../controller/user.js');
const { route } = require('./listing.js');


// ============================================= SIGNUP
router
.route('/signup')
.get((req, res) => {res.render('users/signup.ejs')})
.post(wrapAsync(userController.signUpUser));

// ============================================= LOGIN
router
.route('/login')
.get((req, res) => {res.render('users/login.ejs')})
.post(userRedirectUrl,passport.authenticate('local', { failureRedirect: '/stayfinder/login', failureFlash: true }), userController.loginUser);

// ============================================= LOGOUT
router.get('/logout', wrapAsync(userController.logOutUser))


module.exports = router;