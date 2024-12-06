const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const Review = require("./review.js")

const listingSchema = new Schema({
    title:{ 
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    image:{ 
        // type: String,
        // default: "https://images.unsplash.com/photo-1727730086617-56e7b3ce6fd8?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1727730086617-56e7b3ce6fd8?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          default: [77.2088, 28.6139],
          required: true
        },
      },
    //   category: {
    //     type: String,
    //     enum: ["Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic" ],
    //   },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;