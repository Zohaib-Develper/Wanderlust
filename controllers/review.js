const Listing = require("../models/Listing");
const Review = require("../models/Review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let review = new Review(req.body.review);
  review.author = req.user._id; //Getting id of current user
  console.log(review);
  listing.reviews.push(review); //Add review to the listing
  await listing.save();
  await review.save();
  req.flash("success", "New review created!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(id);
  //To delete ids of reviews from listings
  let result = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }, //$pull operator is used to modify an array. it removes element based on certain condition
  });
  console.log(result);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
