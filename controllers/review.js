const Listing = require("../models/Listing");
const Review = require("../models/Review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let review = new Review(req.body.review);
  review.author = req.user._id;
  console.log(review);
  listing.reviews.push(review);
  await listing.save();
  await review.save();
  req.flash("success", "New review created!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(id);
  let result = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  console.log(result);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
