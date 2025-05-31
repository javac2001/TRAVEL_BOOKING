const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    comments : String,
    date : {
        type : Date,
        default : Date.now()
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Review", reviewSchema);