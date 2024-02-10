const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
let Listing = require("./models/listing.js");

// ===================================MONGOOSE SETUP
main()
.then(()=>{
    console.log("CONNECTED TO DB");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
}

// ===================================For render EJS file
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
// For Parsing Data
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'))

// ===================================EXPRESS SETUP
app.listen(port,()=>{
    console.log(`Lisining port ${port}`);
});

app.get("/",(req, res)=>{
    res.send("THIS IS ROOT");
});
// ===================================CREATE ROUTE
app.get("/listing/new",(req, res)=>{
    res.render("./listings/new.ejs");
})
app.post("/listing",async(req, res)=>{
    let listingData = await new Listing(req.body.data);
    listingData.save()
    .then(()=>{
        res.redirect("/listing");
    })
    .catch((err)=>{
        console.log(err);
    });
})
// ===================================INDEX ROUTE
app.get("/listing",async (req, res)=>{
    let listingData = await Listing.find({});
    res.render("./listings/index.ejs",{listingData});
});
// ===================================SHOW ROUTE
app.get("/listing/:id",async (req,res)=>{
    let {id} = req.params;
    let listingData = await Listing.findById(id);
    console.log(listingData);
    res.render("./listings/show.ejs",{listingData});
});
// ===================================EDIT ROUTE
app.get("/listing/:id/edit",async(req, res)=>{
    let {id} = req.params;
    let listingData = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listingData});
})
// ===================================UPDATE ROUTE
app.put("/listing/:id",async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,req.body.data)
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect(`/listing/${id}`);
})