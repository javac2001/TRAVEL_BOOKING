const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        type : String,
        default : "https://source.unsplash.com/user/erondu/1000x1000",
        set : (v) => v === ""?"https://source.unsplash.com/user/erondu/1000x1000" : v
    },
    price : {
        type : Number,
        default : 0
    },
    location : {
        type : String,
    },
    country : {
        type : String
    }
})

let Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;