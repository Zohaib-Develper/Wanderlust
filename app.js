require("dotenv").config(); //Using .env. Read .evn documentation for details
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const listings = require("./routes/listing");
const reviews = require("./routes/review");
const users = require("./routes/user");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //To save session info on mongo cloud
const flash = require("connect-flash"); // flash middleware to use with session
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");

const mongo_URL = process.env.MONGODB_URL;

const store = MongoStore.create({
  mongoUrl: mongo_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO");
});

const sessionOptions = {
  //This is specifying session options for express session
  store, //For saving session info on mongostore rather than local storage
  secret: process.env.SECRET, //secret for signed cookie (Session ID)
  resave: false, //This is false because i do not want to update session if there is not any change in session
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session(sessionOptions)); //Using express Sessions
app.use(flash());

app.use(passport.initialize()); //Initializes passport middleware
app.use(passport.session()); //For saving data during a session
passport.use(new LocalStrategy(User.authenticate())); //Use Local Strategy

passport.serializeUser(User.serializeUser()); //to save user information
passport.deserializeUser(User.deserializeUser()); //To remove use info

//Connecting to db
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongo_URL);
}

app.listen(8080, () => {
  console.log("Server is listening on Port 8080");
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

//flash
//Saving some info on every request
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user; // to make user info accessible to veiws files
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", users);

//In case of not path
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "No page found"));
});
//Error handling middleware
app.use((err, req, res, next) => {
  let { status = 400, message = "Something went wrong!!" } = err;
  res.status(status).render("error.ejs", { message });
});
