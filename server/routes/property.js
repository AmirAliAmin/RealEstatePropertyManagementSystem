const express = require("express");
const router = express.Router();
const {
  handleProperty,
  deleteProperty,
  updateProperty,
  getAllProperties,
  getPropertyById,
} = require("../controllers/property");

const protect = require("../middlewares/auth");
const upload = require("../config/multer");

// Create property
router.post("/properties", protect, upload.single("propertyImg"), handleProperty);

// Get all
router.get("/properties", getAllProperties);

// Get by ID
router.get("/properties/:id", getPropertyById);

// Update property
router.patch("/properties/:id", protect, upload.single("propertyImg"), updateProperty);

// Delete property
router.delete("/properties/:id", protect, deleteProperty);

module.exports = router;
