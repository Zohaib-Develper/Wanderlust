const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewControllers = require("../controllers/review");

//Reviews

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControllers.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewControllers.destroyReview)
);

module.exports = router;
