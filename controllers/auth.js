const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const {createToken} = require("../services/authantication")
const protect = require("../middlewares/auth")
const checkRole = require("../middlewares/role");
const Property = require("../models/property");



async function registerNewUser(req,res) {
       try {
     const {fullName,password,email,role} = req.body;
      const existing = await User.findOne({email});
      if (existing) {
        return res.status(400).json({msg:"User already exists"});
      }
    
      const hash = await bcrypt.hash(password, 10);
      const user = new User({fullName, email, password: hash, role});
      await user.save();

      res.status(202).json({msg:"Registered Successfully", user})
   } catch (error) {
    console.error(error);
      res.status(500).json({msg:"server Error"})
   }   
};

async function loginUser(req, res) {
     try {
    const {email,password} = req.body;

  const user = await User.findOne({email});
  if (!user) return res.status(400).json({msg:"User is not found"});

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({msg:"invalid user"})
  }
  const token = createToken(user);
   res.status(200).json({token})
  //  console.log("token is" ,createToken())
  } catch (error) {
     console.error(error);
      res.status(500).json({msg:"server Error"})
  }
    
}

async function userData(req , res) {
    try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({msg:"server Error"})
  } 
}
async function handleProperty(req, res) {
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
}

module.exports = {
    registerNewUser,
    loginUser,
    userData,
    handleProperty
}