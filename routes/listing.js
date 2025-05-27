const express = require('express');
const router = express.Router({mergeParams : true});
const dataListingModules = require("../models/dataListingModules.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { schema } = require("../schema.js");


// ================================ Joi Middleware function ================================
const getError = (req, res, next) => {
    let { error } = schema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}



// INDEX
router.get("/", wrapAsync(async (req, res) => {
    const data = await dataListingModules.find();
    res.render("routes/index.ejs", { data });
}));

// SHOW
router.get("/:id/show", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id).populate('review');
    if (!data) throw new ExpressError(404, "Listing not found");
    res.render("routes/show.ejs", { data });
}));

// CREATE FORM
router.get("/create", (req, res) => {
    res.render("routes/create.ejs");
});

// CREATE POST
router.post("/", getError, wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    let newListing = new dataListingModules(listingData);
    await newListing.save();
    res.redirect("/stayfinder");
}));

// EDIT FORM
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    if (!data) throw new ExpressError(404, "Listing not found for editing");
    res.render("routes/edit.ejs", { data });
}));

// UPDATE
router.put("/:id",  getError,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;
    await dataListingModules.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true });
    res.redirect("/stayfinder");
}));

// DELETE
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await dataListingModules.findByIdAndDelete(id);
    res.redirect("/stayfinder");
}));


module.exports = router;