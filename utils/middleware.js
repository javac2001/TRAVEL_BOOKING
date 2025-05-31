const ExpressError = require("../utils/expressError.js");
const { schema, reviewSchema } = require("../utils/schema.js");
const dataListingModules = require("../models/dataListingModules.js");
const reviewModules = require("../models/reviewModels.js");

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

// ================================= Implementation Authentication =================================
module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await dataListingModules.findById(id);
    if(!res.locals.currentUser.equals(listing.owner)){
        req.flash("error", "You are not the Owner");
        return res.redirect(`/stayfinder/${id}/show`)
    }
    next()
}

// ================================= Review Autheraization =================================
module.exports.isReviewOwner = async(req, res, next)=>{
    let { id, reviewId } = req.params;
    let review = await reviewModules.findById(reviewId);
    if(!res.locals.currentUser._id.equals(review.owner)){
        req.flash("error", "You are not the Owner");
        return res.redirect(`/stayfinder/${id}/show`)
    }
    next()
}