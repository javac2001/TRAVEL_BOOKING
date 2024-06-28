const express = require("express");
let router = express.Router();
let Listing = require("../models/listing.js");
/// WrapAsync
const WrapAsync = require("../utils/wrapAsync.js")
// Custom Express Error Class
const ExpressError = require("../utils/ExpressError.js");
// Joi
const {dataSchema} = require("../schema.js");


// login Middleware
let {isValidate} = require("../middleware.js");


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

// ===================================CREATE ROUTE
router.get("/new", isValidate, (req, res) => {
    res.render("./listings/new.ejs");
})
router.post("/",SchemaValidation,WrapAsync( async (req, res, next) => {
        let listingData =  new Listing(req.body.data);
        await listingData.save();
        req.flash("success", "New listing created");
        res.redirect("/listing");
    })
)
// ===================================INDEX ROUTE
router.get("/", WrapAsync(
    async (req, res) => {
        let listingData = await Listing.find({});
        res.render("./listings/index.ejs", { listingData });
    }
));
// ===================================SHOW ROUTE
router.get("/:id", WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        let listingData = await Listing.findById(id).populate("reviews");
        if(!listingData){
            req.flash("error","Listing you request for dose not exist");
            res.redirect("/listing")
        }
        console.log(listingData);
        res.render("./listings/show.ejs", { listingData });
    }
));
// ===================================EDIT ROUTE
router.get("/:id/edit",
    isValidate,
    WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        let listingData = await Listing.findById(id);
        if(!listingData){
            req.flash("error","Listing you request for dose not exist");
            res.redirect("/listing")
        }
        res.render("./listings/edit.ejs", { listingData });
    }
))


// ===================================UPDATE ROUTE
router.put("/:id",
    isValidate, 
    WrapAsync(
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
            req.flash("success", "Listing Update Succeed");
        res.redirect(`/listing/${id}`);
    }
))
// ===================================DELETE ROUTE
router.delete("/:id",isValidate, WrapAsync(
    async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
            req.flash("error", "Listing Delete Succeed");
        res.redirect(`/listing`);
    }
));

module.exports = router;