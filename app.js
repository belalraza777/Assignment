require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Initialize app
const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mongoose setup
const mongoUri =
  process.env.MONGODB_URL ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/Assignment";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
const authRouter = require("./routes/authRoute");
const ejsRouter = require("./routes/ejsRoute");

app.use("/", ejsRouter);
app.use('/api/auth', authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});