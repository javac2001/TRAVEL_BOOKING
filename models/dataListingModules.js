const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviewModels.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: " "
    },
    image: {
        url : String,
        filename : String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (data) => {
    if (data) {
        await Review.deleteMany({
            review: {
                $in: data.review
            }
        })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
