const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { createToken } = require("../services/authantication");

async function registerNewUser(req, res) {
  try {
    const { fullName, password, email, confirmPassword, role } = req.body;

      if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    if (role && role.toUpperCase() === "ADMIN") {
      return res.status(403).json({ msg: "Cannot self-assign ADMIN role" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hash,
      role: role ? role.toUpperCase() : "USER"
    });
    await user.save();

      const { password: _, ...userData } = user.toObject(); // remove password
    res.status(201).json({ msg: "Registered Successfully", user: userData });
  } catch (error) {
     if (error.code === 11000) {
            return res.status(400).json({ msg: "Duplicate field value entered" });
        }
    res.status(500).json({ msg: "server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "User is not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = createToken({ id: user._id, role: user.role });
    res.status(200).json({ token });
    //  console.log("token is" ,createToken())
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server Error" });
  }
}

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.role !== "ADMIN") {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = createToken({ id: user._id, role: user.role });
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function userData(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "server Error" });
  }
}

module.exports = {
  registerNewUser,
  loginUser,
  userData,
  adminLogin,
};
