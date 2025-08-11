const express = require("express");
const protect = require("../middlewares/auth");
const checkRole = require("../middlewares/role");
const { createInquiry, getSaledmanInquiry, getAllInquiry } = require("../controllers/inquiry");
const router = express.Router();


router.post("/", protect, createInquiry);
router.get("/salesman", protect, checkRole("SALESMAN") , getSaledmanInquiry);
router.get("/admin",protect, checkRole("ADMIN"), getAllInquiry);

module.exports = router;