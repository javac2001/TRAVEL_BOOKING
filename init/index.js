const mongoose = require('mongoose');
let Listing = require("../models/listing.js");
let initData = require("./data.js");

main()
.then(()=>{
    console.log("CONNECTED TO DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
}

let initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Initialization Success");
}

initDB();