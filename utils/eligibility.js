// Function to check if a coupon is eligible for a user + cart
exports.isEligible = (coupon, user, cartValue, categories, itemsCount) => {
  const e = coupon.eligibility || {};   // If no eligibility rules → treat as open to all

  // -------- USER RULES --------
  if (e.allowedUserTiers && !e.allowedUserTiers.includes(user.userTier)) return false;
  if (e.minLifetimeSpend && user.lifetimeSpend < e.minLifetimeSpend) return false;
  if (e.minOrdersPlaced && user.ordersPlaced < e.minOrdersPlaced) return false;
  if (e.firstOrderOnly && user.ordersPlaced > 0) return false;
  if (e.allowedCountries && !e.allowedCountries.includes(user.country)) return false;

  // -------- CART RULES --------
  if (e.minCartValue && cartValue < e.minCartValue) return false;
  if (e.minItemsCount && itemsCount < e.minItemsCount) return false;

  // Must contain at least one allowed category
  if (e.applicableCategories) {
    const matches = categories.some(c => e.applicableCategories.includes(c));
    if (!matches) return false;
  }

  // Must not contain excluded categories
  if (e.excludedCategories) {
    const hasExcluded = categories.some(c => e.excludedCategories.includes(c));
    if (hasExcluded) return false;
  }

  // Passed all checks → eligible
  return true;
};