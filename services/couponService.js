const coupons = require("../data/coupons");
const usageTracker = require("../data/usageTracker");
const { isEligible } = require("../utils/eligibility");
const { calculateDiscount } = require("../utils/discount");

// Main logic to find the BEST coupon
exports.findBestCoupon = (user, cart) => {
  if (!cart.items || !Array.isArray(cart.items)) {
    throw new Error("Cart must contain an items array");
  }

  // Calculate total cart value
  const cartValue = cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // Extract category list from items
  const categories = cart.items.map(i => i.category);

  // Total quantity count
  const itemsCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  let validCoupons = [];

  for (const coupon of coupons) {

    // -------- Check Date Validity --------
    const now = new Date();
    if (coupon.startDate && new Date(coupon.startDate) > now) continue;
    if (coupon.endDate && new Date(coupon.endDate) < now) continue;

    // -------- Check Usage Limit Per User --------
    const key = `${user.userId}|${coupon.code}`;
    const used = usageTracker[key] || 0;
    if (coupon.usageLimitPerUser && used >= coupon.usageLimitPerUser) continue;

    // -------- Eligibility Rules --------
    const ok = isEligible(coupon, user, cartValue, categories, itemsCount);
    if (!ok) continue;

    // -------- Calculate Discount --------
    const discount = calculateDiscount(coupon, cartValue);
    if (discount <= 0) continue;

    // Store eligible coupon with discount
    validCoupons.push({ coupon, discount });
  }

  // -------- No valid coupons ⇒ return null --------
  if (validCoupons.length === 0) {
    return { bestCoupon: null, discountAmount: 0 };
  }

  // -------- Sorting Logic --------
  validCoupons.sort((a, b) => {
    // 1. Highest discount first
    if (b.discount !== a.discount) return b.discount - a.discount;

    // 2. Earliest end date wins (if present)
    const dateA = new Date(a.coupon.endDate || 8640000000000000); // distant future if missing
    const dateB = new Date(b.coupon.endDate || 8640000000000000);
    if (dateA - dateB !== 0) return dateA - dateB;

    // 3. Alphabetically smallest code wins
    return a.coupon.code.localeCompare(b.coupon.code);
  });

  // Best coupon is the first after sorting
  return {
    bestCoupon: validCoupons[0].coupon,
    discountAmount: validCoupons[0].discount
  };
};