
# 🚀 Coupon Management System

### **C. Demo Cart (Seeded)**

This demo cart (exported as `demoCart` in `demoData/demoData.js`) is auto-seeded with the demo user and coupons:

```json
{
  "user": {
    "userId": "demo-001",
    "userTier": "NEW",
    "country": "IN",
    "lifetimeSpend": 0,
    "ordersPlaced": 0
  },
  "cart": {
    "items": [
      { "productId": "p-elec-1", "category": "electronics", "unitPrice": 2000, "quantity": 1 },
      { "productId": "p-book-1", "category": "books", "unitPrice": 400, "quantity": 2 }
    ]
  }
}
```

Expected Best Coupon: `CLEANCART20` with discount `300` (20% of 2800 capped at 300).

Test Quickly (PowerShell):
```powershell
curl -Method POST http://localhost:5000/best-coupon -Headers @{"Content-Type"="application/json"} -Body '{"user":{"userId":"demo-001","userTier":"NEW","country":"IN","lifetimeSpend":0,"ordersPlaced":0},"cart":{"items":[{"productId":"p-elec-1","category":"electronics","unitPrice":2000,"quantity":1},{"productId":"p-book-1","category":"books","unitPrice":400,"quantity":2}]}}'
```


A simple backend service built using **Node.js + Express.js** that allows creating coupons and finding the **best applicable coupon** for a user based on their profile and cart details.
This project is designed according to the **Cognifyz Assignment – Coupon Management** requirements.

---

## 📌 1. Project Overview

This project implements a basic **e-commerce coupon engine** where:

* Admins can **create coupons** with multiple eligibility rules.
* Users can check **which coupon gives the highest discount** for a given cart.
* Eligibility rules include user tier, order history, cart value, categories, etc.
* The system uses **in-memory storage**, as required in the assignment.

---

## 🧰 2. Tech Stack

* **Node.js** (v18+)
* **Express.js**
* **In-memory storage (JSON/arrays)**
* JavaScript (CommonJS)

*No database is required.*

---

## 🗂️ 3. Project Structure

```
coupon-system/
│
├─ app.js
├─ routes/
│   ├─ couponRoutes.js
│   └─ bestCouponRoutes.js
├─ controllers/
│   ├─ couponController.js
│   └─ bestCouponController.js
├─ services/
│   └─ couponService.js
├─ data/
│   ├─ coupons.js
│   └─ usageTracker.js
└─ utils/
    ├─ eligibility.js
    └─ discount.js
```

---

## ▶️ 4. How to Run the Project

### **Prerequisites**

* Node.js 18 or above
* npm installed

### **Setup Steps**

```bash
git clone <your-repo-url>
cd coupon-system
npm install
```

### **Start Server**

```bash
node app.js
```

### **Server Runs At:**

```
http://localhost:5000
```

---

## 🧪 5. How to Test the APIs

You can test using:
✔ Postman
✔ Thunder Client (VS Code)
✔ cURL

### **A. Create Coupon**

```
POST http://localhost:5000/coupons
```

**Body Example:**

```json
{
  "code": "WELCOME100",
  "description": "₹100 Flat Off",
  "discountType": "FLAT",
  "discountValue": 100,
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2025-12-31T23:59:59Z",
  "usageLimitPerUser": 1,
  "eligibility": {
    "allowedUserTiers": ["NEW"],
    "minCartValue": 500
  }
}
```

---

### **B. Get Best Coupon**

```
POST http://localhost:5000/best-coupon
```

**Body Example:**

```json
{
  "user": {
    "userId": "u123",
    "userTier": "NEW",
    "country": "IN",
    "lifetimeSpend": 1200,
    "ordersPlaced": 1
  },
  "cart": {
    "items": [
      { "productId": "p1", "category": "electronics", "unitPrice": 1500, "quantity": 1 }
    ]
  }
}
```

---

## 🧠 6. Features Implemented

### ✔ Create Coupons

* Validates unique coupon code
* Saves coupons in memory

### ✔ Evaluate Coupon Eligibility

Checks:

* allowedUserTiers
* minLifetimeSpend
* minOrdersPlaced
* firstOrderOnly
* allowedCountries
* minCartValue
* applicableCategories
* excludedCategories
* minItemsCount

### ✔ Calculate Discount

* FLAT discounts
* PERCENT discounts
* Applies maxDiscountAmount cap

### ✔ Choose Best Coupon Using Deterministic Rules

1. Highest discount
2. Earliest endDate
3. Alphabetically smallest coupon code

### ✔ In-Memory Usage Tracking

* Tracks how many times a user used a coupon
* Enforces usageLimitPerUser

---

## 🔐 7. Demo Login (Required by Assignment)

This user **must exist** for reviewer login (hardcoded):

```
Email: hire-me@anshumat.org
Password: HireMe@2025!
```

You can add this user in your seed or mock data.

---

## 📝 8. AI Usage Note

I used AI (ChatGPT) **only for:**

* Generating boilerplate structure
* Writing documentation
* Adding comments
* Clarifying logic

All **coding decisions, flow, eligibility rules, routes, and final implementation** were manually written and reviewed.

---

## 📤 9. Submission Format (For Google Form)

```
Name: <your name>
GitHub Repo: <your repo link>
Live Demo Link: <deploy on Render / Cyclic / Vercel if needed>
Tech Stack Used: Node.js, Express.js, JavaScript
Notes for Reviewer: (optional)
```

---

## ⭐ Final Notes

This project is built exactly according to the assignment guidelines:

* Clean, simple code
* Fully commented
* In-memory storage
* Deterministic best-coupon logic
* Easy to run
* Reviewer-friendly
