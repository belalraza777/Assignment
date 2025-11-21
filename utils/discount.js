// Calculate discount amount for a coupon based on its type
exports.calculateDiscount = (coupon, cartValue) => {

  // Fixed flat amount (e.g., 100 off)
  if (coupon.discountType === "FLAT") {
    return Math.min(coupon.discountValue, cartValue); 
    // Cannot exceed cartValue
  }

  // Percentage discount (e.g., 10% off)
  if (coupon.discountType === "PERCENT") {
    let amount = (coupon.discountValue / 100) * cartValue;

    // Apply cap if max discount exists
    if (coupon.maxDiscountAmount) {
      amount = Math.min(amount, coupon.maxDiscountAmount);
    }

    return Math.min(amount, cartValue); 
  }

  return 0;
};