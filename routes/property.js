const express = require("express");
const router = express.Router();
const {handleProperty, deleteProperty} = require("../controllers/property")
const protect = require("../middlewares/auth")
const checkRole = require("../middlewares/role");
const upload = require("../config/multer");


router.post("/properties",protect, checkRole("ADMIN"), upload.single("propertyImg")
, handleProperty);

router.delete("/properties/:id", protect, checkRole("ADMIN"),deleteProperty)

module.exports = router;