const dataListingModules = require("../models/dataListingModules.js");
const reviewModel = require("../models/reviewModels.js");
const ExpressError = require("../utils/expressError.js");

// REVIEW form
module.exports.getReviewForm = async (req, res) => {
    let { id } = req.params;
    const data = await dataListingModules.findById(id).populate('review');
    if (!data) throw new ExpressError(404, 'Listing not found');

    res.render('routes/review.ejs', { data });
}

// REVIEW post
module.exports.postReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comments } = req.body.review;

    const reviewData = new reviewModel({rating, comments });
    reviewData.owner = req.user._id;
    await reviewData.save();

    const listing = await dataListingModules.findById(id);
    if (!listing) throw new ExpressError(404, 'Listing not found');

    listing.review.push(reviewData);
    await listing.save();

    res.redirect(`/stayfinder/${id}/show`)
}

// DELETE Review
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await dataListingModules.findByIdAndUpdate(id, { $pull: {review : reviewId} })
    await reviewModel.findByIdAndDelete(reviewId)

    res.redirect(`/stayfinder/${id}/show`)
}