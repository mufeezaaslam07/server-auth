const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  console.log("Login success route accessed");
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
    }
    return res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
