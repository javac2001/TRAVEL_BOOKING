const express = require("express");
let router = express.Router({mergeParams : true});
let Listing = require("../models/listing.js");
let Review = require("../models/review.js");
// WrapAsync
const WrapAsync = require("../utils/wrapAsync.js")
// Custom Express Error Class
const ExpressError = require("../utils/ExpressError.js");
// Joi
const {reviewValidationSchema} = require("../schema.js");

// ===================================For Schema Validation
let ReviewSchemaValidation = (req, res, next) =>{
    let {error} = reviewValidationSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => (el.message)).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// =================================== POST ROUTE

router.post("/",ReviewSchemaValidation, WrapAsync(async(req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let review = req.body.review;
    console.log(review);
    let userReview = await new Review(review);
    
    listing.reviews.push(userReview)

    await userReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`)
}))

// =================================== DELETE ROUTE

router.delete("/:reviewId",WrapAsync(async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
}))

module.exports = router;