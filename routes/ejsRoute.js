const express = require("express");
const { verifyAuth } = require("../middleware/verifyAuth");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", verifyAuth, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
