const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require('../controller/review.js');
const {getReviewError,isAuthenticate,isReviewOwner} = require("../utils/middleware.js")


// route -> GET and POST
router
.route('/')
.get(isAuthenticate,wrapAsync(reviewController.getReviewForm))
.post(getReviewError, isAuthenticate, wrapAsync(reviewController.postReview));

// DELETE reviews
router.delete("/:reviewId", isAuthenticate,isReviewOwner, getReviewError,wrapAsync(reviewController.deleteReview))


module.exports = router;