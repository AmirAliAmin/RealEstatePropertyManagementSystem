const express = require("express");
const router = express.Router();


const protect = require("../middlewares/auth");
const checkRole = require("../middlewares/role");
const { getUser, getUserById, deleteUser } = require("../controllers/userController");

router.use(protect, checkRole("ADMIN"));

router.get("/", getUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

module.exports = router;