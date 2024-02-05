const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const mongoose = require('mongoose');
let Listing = require("./models/listing.js");

// MONGOOSE SETUP
main()
.then(()=>{
    console.log("CONNECTED TO DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
}

// EXPRESS SETUP
app.listen(port,()=>{
    console.log(`Lisining port ${port}`);
});

app.get("/",(req, res)=>{
    res.send("THIS IS ROOT");
});



app.get("/testListing",async (req, res)=>{
    let sampleListing = new Listing({
        title : "My new Villa",
        description : "By the Beach",
        price : 1200,
        location : "Calangute, Goa",
        country : "India"
    });
    await sampleListing.save()
    .then((result)=>{
        console.log(result);
        res.send("Successful");
    })
    .catch((err)=>{
        console.log(err);
    })
})