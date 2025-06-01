const dataListingModules = require("../models/dataListingModules.js");



// INDEX-path
module.exports.indexingRoutePath = async (req, res) => {
    console.log(req.user);
    const data = await dataListingModules.find();
    res.render("routes/index.ejs", { data });
}

// SHOW-path
module.exports.showRoutePath = async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id)
    .populate({
        path : 'review',
        populate : {
            path : 'owner'
        }
    })
    .populate('owner');
    if (!data) {
        req.flash('error', 'This path doesn\'t exist');
        res.redirect('/stayfinder'); 
        throw new ExpressError(404, "Listing not found");
    }

    res.render("routes/show.ejs", { data });
}

// CREATE-path
module.exports.createRoutePath = async (req, res) => {
    const listingData = req.body.listing;
    let newListing = new dataListingModules(listingData);
    newListing.owner = req.user._id
    await newListing.save();
    req.flash('success', 'Listing created')
    res.redirect("/stayfinder");
}

// EDIT-path
module.exports.editRoutePath = async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    if (!data) {
        req.flash('error', 'This path doesn\'t exist');
        res.redirect('/stayfinder'); 
        throw new ExpressError(404, "Listing not found");
    }
    res.render("routes/edit.ejs", { data });
}

// UPDATE-path
module.exports.updateRoutePath = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;
    await dataListingModules.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true });
    req.flash('success', 'Listing update')
    res.redirect("/stayfinder");
}

// DELETE-path
module.exports.deleteRoutePath = async (req, res) => {
    const { id } = req.params;
    await dataListingModules.findByIdAndDelete(id);
    req.flash('error', 'Listing deleted')
    res.redirect("/stayfinder");
}