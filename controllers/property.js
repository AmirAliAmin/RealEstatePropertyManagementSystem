const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const {createToken} = require("../services/authantication")
const protect = require("../middlewares/auth")
const checkRole = require("../middlewares/role");
const Property = require("../models/property");


async function handleProperty(req, res) {
  try {
    const{title,discription,price,location} = req.body
  const property = new Property({
    title,
    discription,
    price,
    location,
    propertyImg:req.file.filename,
    createdBy: req.user._id,
  })
  await property.save();
  res.status(201).json({msg: "property created", property})
    
  } catch (error) {
    console.log(error)
    console.log("Uploaded file info:", req.file);
    res.status(500).json({msg:"Server Error"})
  }
}

module.exports = {
    handleProperty
}