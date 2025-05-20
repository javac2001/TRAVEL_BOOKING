const mongoose = require('mongoose');
const dataListingModules = require("../models/dataListingModules.js");
const initData = require("./data.js")

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/StayFinder');
}
main().then(()=> {console.log("Connection Established by MONGOOSE")}).catch((err)=>{console.log(err);})


async function initialiseInDatabase(arr) {
    try {
        await dataListingModules.deleteMany({}).then(()=>{console.log("Clear in DB");}).catch((err)=>{console.log(err);});
        await dataListingModules.insertMany(arr).then(()=>{console.log("Insert bulk data in Database");}).catch((err)=>{console.log(err);})
    } catch (error) {
        console.log(error);
    }
}

initialiseInDatabase(initData.data);