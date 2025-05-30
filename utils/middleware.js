module.exports.isAuthenticate = (req, res, next) => {
    if(! req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "First, you must have to loged in :(")
        console.log(req.session.redirectUrl);
        return res.redirect("/stayfinder/login")
    }
    next()
}

module.exports.userRedirectUrl = (req, res, next) => {
    console.log(res.locals.redirectUrl);
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}