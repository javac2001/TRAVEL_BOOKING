const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError = require("./utils/expressError.js");
// =============================== ROUTES ===============================
const listings = require('./routes/listing.js')
const reviews = require('./routes/review.js')

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

// ================================================================= Listing
app.use('/stayfinder',listings);

// ================================================================= Reviews
app.use('/stayfinder/:id/review',reviews)



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
