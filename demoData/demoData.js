// ---------------------------
// DEMO USER (Required by Assignment)
// ---------------------------
const demoUser = {
  userId: "demo-001",
  email: "hire-me@anshumat.org",
  password: "HireMe@2025!",
  userTier: "NEW",
  country: "IN",
  lifetimeSpend: 0,
  ordersPlaced: 0
};

// ---------------------------
// SAMPLE SEED COUPONS
// ---------------------------

// A. Flat ₹100 Off (New Users)
const coupon1 = {
  code: "WELCOME100",
  description: "Flat ₹100 Off for New Users",
  discountType: "FLAT",
  discountValue: 100,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-12-31T23:59:59Z",
  usageLimitPerUser: 1,
  eligibility: {
    allowedUserTiers: ["NEW"],
    minCartValue: 500
  }
};

// B. 10% Off (Max ₹200)
const coupon2 = {
  code: "FESTIVE10",
  description: "10% Off (Max ₹200)",
  discountType: "PERCENT",
  discountValue: 10,
  maxDiscountAmount: 200,
  startDate: "2025-10-01T00:00:00Z",
  endDate: "2025-11-30T23:59:59Z",
  eligibility: {
    minCartValue: 300
  }
};

// C. 5% Off on Electronics
const coupon3 = {
  code: "ELECTRO5",
  description: "5% Off on Electronics",
  discountType: "PERCENT",
  discountValue: 5,
  maxDiscountAmount: 150,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-12-31T23:59:59Z",
  eligibility: {
    applicableCategories: ["electronics"]
  }
};

// D. Flat ₹50 for GOLD Users
const coupon4 = {
  code: "GOLD50",
  description: "₹50 Off for Gold Tier Users",
  discountType: "FLAT",
  discountValue: 50,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-12-31T23:59:59Z",
  eligibility: {
    allowedUserTiers: ["GOLD"]
  }
};

// E. 20% Off if No Fashion Items
const coupon5 = {
  code: "CLEANCART20",
  description: "20% Off if No Fashion Items in Cart",
  discountType: "PERCENT",
  discountValue: 20,
  maxDiscountAmount: 300,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-12-31T23:59:59Z",
  eligibility: {
    excludedCategories: ["fashion"],
    minCartValue: 1000
  }
};

// ---------------------------
// EXPORT ALL SEEDS
// ---------------------------
module.exports = {
  demoUser,
  demoCoupons: [coupon1, coupon2, coupon3, coupon4, coupon5]
};
