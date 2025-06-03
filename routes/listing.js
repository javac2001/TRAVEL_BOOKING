const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isAuthenticate, getError, isOwner} = require("../utils/middleware.js")
const listingController = require('../controller/listing.js');
const multer  = require('multer');
const {storage} = require('../cloudSetup.js');
const upload = multer({ storage });


// route -> INDEX and POST
router
.route("/")
.get(wrapAsync(listingController.indexingRoutePath))
.post(upload.single('listing[image]'), isAuthenticate, getError, wrapAsync(listingController.createRoutePath));

// SHOW
router.get("/:id/show", wrapAsync(listingController.showRoutePath));

// CREATE FORM
router.get("/create",isAuthenticate,(req, res) => { res.render("routes/create.ejs") });

// EDIT FORM
router.get("/:id/edit",isAuthenticate, isOwner,wrapAsync(listingController.editRoutePath));

// route -> UPDATE and DELETE
router
.route("/:id")
.put(upload.single('listing[image]'),getError,isAuthenticate, isOwner,wrapAsync(listingController.updateRoutePath))
.delete(isAuthenticate, isOwner,wrapAsync(listingController.deleteRoutePath));


module.exports = router;