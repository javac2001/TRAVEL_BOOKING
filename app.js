const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
// ===================================Listing Route
let listing = require("./routes/listing.js")
// ===================================Review Route
let reviews = require("./routes/reviews.js")

// Custom Express Error Class
const ExpressError = require("./utils/ExpressError.js");

// ===================================MONGOOSE SETUP
main()
    .then(() => {
        console.log("CONNECTED TO DB");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
}


// ===================================For render EJS file
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ===================================For ejs-mate
app.engine('ejs', engine);
// ===================================For Parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
// ===================================For Static files
app.use(express.static(path.join(__dirname, "public")));
// ===================================For Express Session
const sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized: true,
    cookie : {
        expire : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}
app.use(session(sessionOption));
// ===================================FLASH
app.use(flash());
// ===================================EXPRESS SETUP
app.listen(port, () => {
    console.log(`Lisining port ${port}`);
});

app.get("/", (req, res) => {
    res.send("THIS IS ROOT");
});

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    next();
})

// =================================== Listing ===================================
app.use("/listing",listing);
// =================================== Review ===================================
app.use("/listing/:id/reviews",reviews);


// Error Handling

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});

})