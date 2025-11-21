const express = require("express");
const app = express();
const couponRoutes = require("./routes/couponRoutes");
const bestCouponRoutes = require("./routes/bestCouponRoutes");
const coupons = require("./data/coupons");
const users = require("./data/users");
const { demoUser, demoCoupons } = require("./demoData/demoData");

// Seed initial data
users.push(demoUser);
coupons.push(...demoCoupons);
console.log("Data Initialized Successfully!");

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Map routes to URL paths
app.use("/coupons", couponRoutes);          // Create + List coupons
app.use("/best-coupon", bestCouponRoutes);  // Get best coupon for user+cart

// Root health endpoint
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


module.exports = app;