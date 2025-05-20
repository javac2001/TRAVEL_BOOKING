const mongoose = require('mongoose');

const listingModule = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : " "
    },
    image : {
        type : String,
        default : "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        set : (v) => {
            if (v === " " || v === ""){
                return "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
            }else{
                return v
            }
        }
    },
    price : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }
})

const listing = new mongoose.model("listing", listingModule);

module.exports = listing;