const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require('../controller/review.js');
const {getReviewError,isAuthenticate,isReviewOwner} = require("../utils/middleware.js")


// GET review page
router.get('/', isAuthenticate,wrapAsync(reviewController.getReviewForm))

// POST reviews
router.post('/', getReviewError, isAuthenticate, wrapAsync(reviewController.postReview));

// DELETE reviews
router.delete("/:reviewId", isAuthenticate,isReviewOwner, getReviewError,wrapAsync(reviewController.deleteReview))


module.exports = router;