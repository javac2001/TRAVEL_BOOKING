const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
let Listing = require("./models/listing.js");
let Review = require("./models/review.js");
const engine = require('ejs-mate');

// WrapAsync
const WrapAsync = require("./utils/wrapAsync.js")
// Custom Express Error Class
const ExpressError = require("./utils/ExpressError.js");
// Joi
const {dataSchema, reviewValidationSchema} = require("./schema.js");
const wrapAsync = require('./utils/wrapAsync.js');

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
let SchemaValidation = (req, res, next) =>{
    let {error} = dataSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => (el.message)).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}
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
// ===================================CREATE ROUTE
app.get("/listing/new", (req, res) => {
    res.render("./listings/new.ejs");
})
app.post(
    "/listing",
    SchemaValidation,
    WrapAsync( async (req, res, next) => {
        let listingData =  new Listing(req.body.data);
        await listingData.save();
        res.redirect("/listing");
    })
)
// ===================================INDEX ROUTE
app.get("/listing", WrapAsync(
    async (req, res) => {
        let listingData = await Listing.find({});
        res.render("./listings/index.ejs", { listingData });
    }
));
// ===================================SHOW ROUTE
app.get("/listing/:id", WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        let listingData = await Listing.findById(id).populate("reviews");
        console.log(listingData);
        res.render("./listings/show.ejs", { listingData });
    }
));
// ===================================EDIT ROUTE
app.get("/listing/:id/edit",
    WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        let listingData = await Listing.findById(id);
        res.render("./listings/edit.ejs", { listingData });
    }
))


// ===================================UPDATE ROUTE
app.put("/listing/:id", WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        if(!req.body.data){
            throw new ExpressError(400, "Send valid data");
        }
        await Listing.findByIdAndUpdate(id, req.body.data)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
        res.redirect(`/listing/${id}`);
    }
))
// ===================================DELETE ROUTE
app.delete("/listing/:id", WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
        res.redirect(`/listing`);
    }
));


// =================================== REVIEWS ===================================
// =================================== POST ROUTE

app.post("/listing/:id/reviews",ReviewSchemaValidation, wrapAsync(async(req, res) =>{
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

// Error Handling

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});

})