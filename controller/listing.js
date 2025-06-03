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
            path: 'review',
            populate: {
                path: 'owner'
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
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new dataListingModules(listingData);
    newListing.owner = req.user._id
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'Listing created')
    res.redirect("/stayfinder");
}

// EDIT-path
module.exports.editRoutePath = async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    let newImgData = data.image.url.replace('/upload','/upload/c_fill,h_200,w_300')
    if (!data) {
        req.flash('error', 'This path doesn\'t exist');
        res.redirect('/stayfinder');
        throw new ExpressError(404, "Listing not found");
    }
    res.render("routes/edit.ejs", { data, newImgData });
}

// UPDATE-path
module.exports.updateRoutePath = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;

    if (req.file) {
        const { path: url, filename } = req.file;
        updatedData.image = { url, filename };
    }

    const updatedListing = await dataListingModules.findByIdAndUpdate(
        id,
        updatedData,
        { runValidators: true, new: true }
    );

    if (!updatedListing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/stayfinder');
    }

    req.flash('success', 'Listing updated');
    res.redirect('/stayfinder');
}

// DELETE-path
module.exports.deleteRoutePath = async (req, res) => {
    const { id } = req.params;
    await dataListingModules.findByIdAndDelete(id);
    req.flash('error', 'Listing deleted')
    res.redirect("/stayfinder");
}