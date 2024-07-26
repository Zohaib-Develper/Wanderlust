const { isValidObjectId } = require("mongoose");
const Listing = require("../models/Listing");

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  if (Object.keys(req.query).length !== 0) {
    if (req.query.category) {
      listings = listings.filter(
        (listing) => listing.category === req.query.category
      );
    } else {
      const searchTerm = req.query.search.toLowerCase();
      listings = listings.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    }
  }
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.listingDetails = async (req, res) => {
  let { id } = req.params;
  if (isValidObjectId(id)) {
    //Checking whether id is correct or not
    let listing = await Listing.findById(id)
      .populate({
        //Populating reviews and their author as well as owner of listings
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      res.redirect("/listings");
    } else res.render("listings/show.ejs", { listing });
  } else {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
};

module.exports.createListing = async (req, res, next) => {
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  let url = req.file.path; //Path from cloudinary
  let filename = req.file.filename; //From cloudinary
  newListing.image = { url, filename };
  console.log(newListing);

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  } else res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) throw new ExpressError(400, "Values are missing");
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    //Updating if user enter a new image
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndDelete(id);
  console.log(listing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
