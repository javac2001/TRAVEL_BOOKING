const ExpressError = require("../utils/expressError.js");
const { schema, reviewSchema } = require("../schema.js");


// ================================== Verify User(Passport) ==================================
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

// ================================ Joi Middleware function ================================

// Listing
module.exports.getError = (req, res, next) => {
    let { error } = schema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}
// Review
module.exports.getReviewError = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}