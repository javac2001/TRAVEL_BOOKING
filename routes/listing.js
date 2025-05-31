const express = require('express');
const router = express.Router({mergeParams : true});
const dataListingModules = require("../models/dataListingModules.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {isAuthenticate, getError, isOwner} = require("../utils/middleware.js")

// INDEX
router.get("/", wrapAsync(async (req, res) => {
    const data = await dataListingModules.find();
    res.render("routes/index.ejs", { data });
}));

// SHOW
router.get("/:id/show", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id).populate('review').populate('owner');
    if (!data) {
        req.flash('error', 'This path doesn\'t exist');
        res.redirect('/stayfinder'); 
        throw new ExpressError(404, "Listing not found");
    }

    res.render("routes/show.ejs", { data });
}));

// CREATE FORM
router.get("/create",isAuthenticate,(req, res) => {
    res.render("routes/create.ejs");
});

// CREATE POST
router.post("/", getError, wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    let newListing = new dataListingModules(listingData);
    newListing.owner = req.user._id
    await newListing.save();
    req.flash('success', 'Listing created')
    res.redirect("/stayfinder");
}));

// EDIT FORM
router.get("/:id/edit",isAuthenticate, isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    if (!data) {
        req.flash('error', 'This path doesn\'t exist');
        res.redirect('/stayfinder'); 
        throw new ExpressError(404, "Listing not found");
    }
    res.render("routes/edit.ejs", { data });
}));

// UPDATE
router.put("/:id", getError,isAuthenticate, isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;
    await dataListingModules.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true });
    req.flash('success', 'Listing update')
    res.redirect("/stayfinder");
}));

// DELETE
router.delete("/:id",isAuthenticate, isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    await dataListingModules.findByIdAndDelete(id);
    req.flash('error', 'Listing deleted')
    res.redirect("/stayfinder");
}));


module.exports = router;