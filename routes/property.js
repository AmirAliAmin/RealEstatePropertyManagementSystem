const express = require("express");
const router = express.Router();
const {handleProperty} = require("../controllers/property")
const protect = require("../middlewares/auth")
const checkRole = require("../middlewares/role");
const upload = require("../config/multer");


router.post("/properties",protect, checkRole("ADMIN"), upload.single("propertyImg")
, handleProperty);

module.exports = router;