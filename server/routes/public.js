const express = require("express");
const routes = express.Router();
const property = require("../models/property");
const {getPropertyById, getAllProperties} = require("../controllers/property");

routes.get("/properties" , getAllProperties);

routes.get("/properties/:id", getPropertyById)

module.exports = routes;