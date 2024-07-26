const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    const user = new User({ username, email });
    const registered = await User.register(user, password); //Passsword is regeserd
    //console.log(registered);
    req.flash("success", "User registered Successfully");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", "User with the given name already exists");
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back");
  let redirectUrl = res.locals.Url || "/listings"; //Used saved locally save url saved by "saveUrl" middleware if possible
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged Out!");
    res.redirect("/listings");
  });
};
