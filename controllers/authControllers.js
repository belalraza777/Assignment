const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
};

// Generate JWT Helper
function generateToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}

// Signup Controller
exports.signup = async (req, res) => {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
        email,
        username,
        password: hash,
    });

    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
        success: true,
        message: "Login successful",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
};

// Logout Controller
exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    res.json({ success: true, message: "Logout successful" });
};
