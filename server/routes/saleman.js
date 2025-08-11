const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

const { createSaleman, getAllSaleman, getSalemanById, updateSaleman, deleteSaleman } = require("../controllers/salemanController");

router.use(protect, checkRole("ADMIN"));

router.post("/", createSaleman);
router.get("/", getAllSaleman);
router.get("/:id",getSalemanById );
router.patch("/:id", updateSaleman);
router.delete("/:id", deleteSaleman);

module.exports = router;