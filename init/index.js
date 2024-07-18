const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");
const User = require("../models/user.js");

//Connecting to db
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

async function init() {
  await Listing.deleteMany();
  let initialUser = await User.findOne({ username: "Zohaib" });
  console.log(initialUser);
  if (!initialUser) {
    initialUser = new User({
      email: "zohaib@gmail.com",
      username: "Zohaib",
    }); //default owner of all initial listings
    const result = await User.register(initialUser, "123");
    console.log(result);
  }
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: initialUser._id,
  }));

  await Listing.insertMany(initData.data);
  console.log("Initialized");
}
init();
