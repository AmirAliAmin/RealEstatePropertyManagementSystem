const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/user");
const {createToken} = require("../services/authantication")
const protect = require("../middlewares/auth")
const checkRole = require("../middlewares/role");
const { registerNewUser, loginUser, userData, handleProperty, adminLogin } = require("../controllers/auth");
const upload = require("../config/multer");


router.post("/register", registerNewUser);

router.post("/login", loginUser);
router.post("/admin-login", adminLogin)

//route for user
router.get("/me", protect, userData);



router.get("/admin-only",protect, checkRole("ADMIN"), (req , res)=>{
  res.send("Hello Admin");
});
router.get("/saleman-only",protect, checkRole("SALESMAN"), (req , res)=>{
  res.send("Hello sale Man");
});
router.get("/user-only" ,protect, checkRole("USER"), (req , res)=>{
  res.send("Hello User");
});

module.exports =router;