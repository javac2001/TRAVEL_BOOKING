const User = require('../models/userModel.js');

// SIGNUP user
module.exports.signUpUser = async (req, res) => {
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
}

// LOGIN user
module.exports.loginUser = async (req, res) => {
    if(res.locals.redirectUrl){
        req.flash("success", "Welcome to Stay Finder :)")
        return res.redirect(res.locals.redirectUrl)
    }else{
        res.redirect('/stayfinder')
    }

}

// LOGOUT user
module.exports.logOutUser = async (req, res, next) => {
    try {
        req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "Successfully logout")
        res.redirect('/stayfinder')
    })
    } catch (err) {
        next(err);
    }
}