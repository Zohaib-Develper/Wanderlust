const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveUrl } = require("../middleware");
const userControllers = require("../controllers/user");

router
  .route("/signup")
  .get(userControllers.renderSignup)
  .post(wrapAsync(userControllers.signup));

router
  .route("/login")
  .get(userControllers.renderLoginForm)
  .post(
    saveUrl, //passport.authenticate will reset the req.session in case of success so to save to URL from which
    //user is sent to login page , i have used saveURL middleware to save URL to locals
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logout);

module.exports = router;
