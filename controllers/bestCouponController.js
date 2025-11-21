const couponService = require("../services/couponService");

// Controller for best coupon API
exports.getBestCoupon = (req, res) => {
  const { user, cart } = req.body;

  // Validate required inputs
  if (!user || !cart) {
    return res.status(400).json({ message: "User and cart are required" });
  }

  try {
    // Delegate logic to service layer (clean separation)
    const result = couponService.findBestCoupon(user, cart);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Failed to compute best coupon", error: err.message });
  }
};