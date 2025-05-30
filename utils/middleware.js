const isAuthenticate = (req, res, next) => {
    if(! req.isAuthenticated()){
        req.flash("error", "First, you must have to loged in :(")
        res.redirect("/stayfinder/login")
    }
    next()
}

module.exports = isAuthenticate;