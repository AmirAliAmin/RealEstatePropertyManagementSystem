const Inquiry = require("../models/inquiry");
const User = require("../models/user");
const Property = require("../models/property")

async function createInquiry(req, res) {
    try {
        const {propertyId, message} = req.body;
        const inquiry = await Inquiry.create({
            user: req.user._id,
            propertyId,
            message,
        });
        res.status(200).json({msg:"Inquiry submitted", inquiry});
    } catch (error) {
        res.status(500).json("Server Error")
    }
}

async function getSaledmanInquiry(req, res) {
    try {
       const salesmanId = req.user._id;

       //get property that are created by salesmans
       const properties = await Property.find({createdBy: salesmanId}).select("_id");
       const propertyIds = properties.map(p=> p._id) ;
       
       //get inquires
       const inquires = await Inquiry.find({propertyId:{$in : propertyIds}}).populate("user", "fullname email").populate("propertyId",  "title");

       res.status(200).json(inquires);
        
    } catch (error) {
        res.status(500).json("Server Error") 
    }
    
}

async function getAllInquiry(req, res) {
    try {
        const inquires =await Inquiry.find().populate("user", "fullName email").populate("propertyId", "title");

        res.status(200).json(inquires);
        
    } catch (error) {
        res.status(500).json("Server Error")
        
    }
}

module.exports ={
    createInquiry,
    getSaledmanInquiry,
    getAllInquiry,

}