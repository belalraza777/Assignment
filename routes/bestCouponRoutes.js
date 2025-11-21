const express = require("express");
const router = express.Router();

const { getBestCoupon } = require("../controllers/bestCouponController");

// Route to compute the best coupon for a given user + cart
router.post("/", getBestCoupon);

module.exports = router;