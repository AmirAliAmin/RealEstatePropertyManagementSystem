const express = require("express");
const routes = express.Router();
const property = require("../models/property");
const {getPropertyById} = require("../controllers/property");

routes.get("/properties" , async(req , res)=>{
    try {
        const properties = await property.find().populate("createdBy", "fullName email").sort({createdAt: -1});
        res.status(200).json(properties);

    } catch (error) {
        console.error("Erro",error)
        res.status(500).json({msg:"Server Error"});
    }
});

routes.get("/properties/:id", getPropertyById)

module.exports = routes;