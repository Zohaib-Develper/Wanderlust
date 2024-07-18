const Listing = require("./models/Listing");
const Review = require("./models/Review");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.Url = req.originalUrl;
    req.flash("error", "You must be logged in");
    res.redirect("/login");
  } else next();
};

module.exports.saveUrl = (req, res, next) => {
  if (req.session.Url) {
    res.locals.Url = req.session.Url;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.curUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Using Joi
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;

  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.curUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
