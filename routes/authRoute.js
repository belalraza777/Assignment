const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const { validate, signupSchema, loginSchema } = require("../middleware/joi");
const asyncWrap = require("../middleware/asyncWrap");

const router = express.Router();

// Auth Routes
router.post("/signup", validate(signupSchema), asyncWrap(signup));
router.post("/login", validate(loginSchema), asyncWrap(login));
router.get("/logout", logout);

module.exports = router;
