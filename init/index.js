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
    let arr = [];
    for(let i = 0; i<initData.data.length; i++){
      arr.push({
        title : initData.data[i].title,
        description : initData.data[i].description,
        image : initData.data[i].image.url,
        price : initData.data[i].price,
        location : initData.data[i].location,
        country : initData.data[i].country,
        owners : '668cd3ccc8870573f9f9af20'
      });
    }
    // let insertData = arr.map((obj)=>(
    //   {
    //     ...obj,
    //     owners : '668cd3ccc8870573f9f9af20'
    //   }
    // ))
    await Listing.insertMany(arr);
}

initDB();