const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// ===================================USER model
const User = require('./models/user.js');
// ===================================Listing Route
let listingRouter = require("./routes/listing.js")
// ===================================Review Route
let reviewsRouter = require("./routes/reviews.js")
// ===================================User Route
let userRouter = require("./routes/user.js")

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
// ===================================SESSION
app.use(session(sessionOption));
// ===================================FLASH
app.use(flash());
// ===================================PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// ===================================PASSPORT-LOCAL-MONGOOSE, PASSPORT-LOCAL
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===================================EXPRESS SETUP
app.listen(port, () => {
    console.log(`Lisining port ${port}`);
});

app.get("/", (req, res) => {
    res.send("THIS IS ROOT");
});
// ===================================LOCAL VARIABLE
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.userInfo = req.user;
    next();
})

// =================================== Listing ===================================
app.use("/listing",listingRouter);
// =================================== Review ===================================
app.use("/listing/:id/reviews",reviewsRouter);
// =================================== User ===================================
app.use("/",userRouter);


// Error Handling

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});

})