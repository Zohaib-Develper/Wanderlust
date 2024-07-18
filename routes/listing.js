const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingControllers = require("../controllers/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });

//index
router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );

//New route here i have place this before the below get request because
//the below get request will interpret new as id and get this request always
//new route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingControllers.listingDetails))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingControllers.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.renderEditForm)
);

module.exports = router;
