const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review");

const listingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
});

listingSchema.post("findOneAndDelete", async (listing) => {
  console.log(listing.reviews);
  await Review.deleteMany({ _id: { $in: listing.reviews } });
});

const Listing = new mongoose.model("Listing", listingSchema);

module.exports = Listing;
