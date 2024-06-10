const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
let Listing = require("./models/listing.js");
let Review = require("./models/review.js");
const engine = require('ejs-mate');
// ===================================Listing Route
let listing = require("./routes/listing.js")

// WrapAsync
const WrapAsync = require("./utils/wrapAsync.js")
// Custom Express Error Class
const ExpressError = require("./utils/ExpressError.js");
// Joi
const {dataSchema, reviewValidationSchema} = require("./schema.js");

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
// ===================================For Schema Validation
let ReviewSchemaValidation = (req, res, next) =>{
    let {error} = reviewValidationSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => (el.message)).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}
// ===================================EXPRESS SETUP
app.listen(port, () => {
    console.log(`Lisining port ${port}`);
});

app.get("/", (req, res) => {
    res.send("THIS IS ROOT");
});

// =================================== Listing ===================================
app.use("/listing",listing);




// =================================== REVIEWS ===================================
// =================================== POST ROUTE

app.post("/listing/:id/reviews",ReviewSchemaValidation, WrapAsync(async(req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let review = req.body.review;
    console.log(review);
    let userReview = await new Review(review);
    
    listing.reviews.push(userReview)

    await userReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`)
}))

// =================================== DELETE ROUTE

app.delete("/listing/:id/reviews/:reviewId",WrapAsync(async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
}))

// Error Handling

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});

})