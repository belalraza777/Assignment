const coupons = require("../data/coupons");

// Create a new coupon and store it in memory
exports.createCoupon = (req, res) => {
  const coupon = req.body;

  if (!coupon || !coupon.code) {
    return res.status(400).json({ message: "Coupon object with code is required" });
  }

  // Check if coupon code already exists (we reject duplicates)
  const exists = coupons.find(c => c.code === coupon.code);
  if (exists) {
    return res.status(409).json({ message: "Coupon code already exists" });
  }

  // Basic date validation (optional enhancement)
  if (coupon.startDate && coupon.endDate) {
    const start = new Date(coupon.startDate);
    const end = new Date(coupon.endDate);
    if (isNaN(start) || isNaN(end) || start > end) {
      return res.status(400).json({ message: "Invalid date range" });
    }
  }

  // Save coupon to memory
  coupons.push(coupon);

  return res.status(201).json({ message: "Coupon created", coupon });
};

// Return all coupons
exports.listCoupons = (req, res) => {
  return res.json(coupons);
};