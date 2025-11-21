const express = require("express");
const router = express.Router();

const { createCoupon, listCoupons } = require("../controllers/couponController");

// Route to create a new coupon
router.post("/", createCoupon);

// Route to list all coupons (for testing/debug)
router.get("/", listCoupons);

module.exports = router;