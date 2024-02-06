const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
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

// ===================================EXPRESS SETUP
app.listen(port,()=>{
    console.log(`Lisining port ${port}`);
});

app.get("/",(req, res)=>{
    res.send("THIS IS ROOT");
});

// ===================================INDEX ROUTE
app.get("/listing",async (req, res)=>{
    let listingData = await Listing.find({});
    res.render("./listings/index.ejs",{listingData});
});
// ===================================SHOW ROUTE
app.get("/listing/:id",async (req,res)=>{
    let {id} = req.params;
    let listingData = await Listing.findById(id);
    res.render("./listings/show.ejs",{listingData});
});