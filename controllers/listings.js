const Listing = require("../models/listing");
const User = require("../models/user");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "openstreetmap", // You can also use 'google', 'mapquest', etc.
};

const geocoder = NodeGeocoder(options);

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", {allListings});
// };

module.exports.index = async (req, res) => {
  const { country } = req.query;
  let allListings;

  if (country && country !== "All") {
    // allListings = await Listing.find({ country });
    allListings = await Listing.find({
      country: new RegExp(`^${country}$`, "i"),
    }); //new RegExp(`^${country}$`, 'i')
  } else {
    allListings = await Listing.find({});
  }
  const allListing = await Listing.find({});

  // Get distinct list of countries to show in dropdown
  const allCountries = await Listing.distinct("country");

  res.render("listings/index.ejs", {
    allListing,
    allListings,
    allCountries,
    selectedCountry: country || "All",
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let place = req.body.listing.location;
  const loc = await geocoder.geocode(place);

  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;

  const point = {
    type: "Point",
    coordinates: [longitude, latitude], // Note: [longitude, latitude] is the correct order
  };

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  console.log(newListing);
  // Trim leading/trailing spaces from country
  if (newListing.country) {
    newListing.country = newListing.country.trim();
  }
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = point;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
