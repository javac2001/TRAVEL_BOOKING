module.exports.isValidate = (req, res, next) =>{
    if(! req.isAuthenticated()){
        req.flash("error","You must be login to create")
        return res.redirect("/login");
    }
    next();
}