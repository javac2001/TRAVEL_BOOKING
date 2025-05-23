const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const dataListingModules = require("./models/dataListingModules.js");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const getErrorFromSchema = require("./schema.js");

// View Engine Setup
app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Add logger here
app.use((req, res, next) => {
    console.log("Incoming request path:", req.path, req.method);
    next();
});

// Joi Middleware function
const getError = (req, res, next) => {
    let {error} = getErrorFromSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404, errMsg);
    }else{
        next();
    }
}

// MongoDB Connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayFinder');
}
main()
    .then(() => console.log("Connection Established by MONGOOSE"))
    .catch(err => console.log("MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
    res.redirect("/stayfinder");
});

// INDEX
app.get("/stayfinder", wrapAsync(async (req, res) => {
    const data = await dataListingModules.find();
    res.render("routes/index.ejs", { data });
}));

// SHOW
app.get("/stayfinder/:id/show", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    if (!data) throw new ExpressError(404, "Listing not found");
    res.render("routes/show.ejs", { data });
}));

// CREATE FORM
app.get("/stayfinder/create", (req, res) => {
    res.render("routes/create.ejs");
});

// CREATE POST
app.post("/stayfinder", getError,wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    await dataListingModules.insertOne(listingData).then(() => {
        console.log("Data inserted in DB");
    })
    res.redirect("/stayfinder");
}));

// EDIT FORM
app.get("/stayfinder/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await dataListingModules.findById(id);
    if (!data) throw new ExpressError(404, "Listing not found for editing");
    res.render("routes/edit.ejs", { data });
}));

// UPDATE
app.put("/stayfinder/:id",getError, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;
    await dataListingModules.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true });
    res.redirect("/stayfinder");
}));

// DELETE
app.delete("/stayfinder/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await dataListingModules.findByIdAndDelete(id);
    res.redirect("/stayfinder");
}));

// 404 Route - catch all
app.all("/:path*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        error: err,
        lang: req.query.lang || 'en'
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});
