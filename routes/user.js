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
    saveUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logout);

module.exports = router;
