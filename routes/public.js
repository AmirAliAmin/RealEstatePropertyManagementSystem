const express = require("express");
const routes = express.Router();
const property = require("../models/property");

routes.get("/properties" , async(req , res)=>{
    try {
        const properties = await property.find().populate("createdBy", "name email").sort({createdAt: -1});
        res.status(200).json(properties);

    } catch (error) {
        console.error("Erro",error)
        res.status(500).json({msg:"Server Error"});
    }
})

module.exports = routes;