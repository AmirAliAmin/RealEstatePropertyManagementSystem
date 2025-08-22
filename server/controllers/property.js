const Property = require("../models/property");
const fs = require("fs");
const path = require("path");

async function handleProperty(req, res) {
  try {
    const { title, discription, price, location } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Property image is required" });
    }

    const property = new Property({
      title,
      discription,
      price,
      location,
      propertyImg: `/uploads/${req.file.filename}`, // store full path
      createdBy: req.user._id,
    });

    await property.save();
    res.status(201).json({ msg: "Property created", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

async function getAllProperties(req, res) {
  try {
    const { location, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const query = {};

    if (location) query.location = location;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(query)
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    // attach absolute URL for frontend
    const withUrls = properties.map((p) => ({
      ...p,
      propertyImg: p.propertyImg
        ? `${req.protocol}://${req.get("host")}${p.propertyImg}`
        : null,
    }));

    res.status(200).json(withUrls);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function getPropertyById(req, res) {
  try {
    const property = await Property.findById(req.params.id)
      .populate("createdBy", "fullName email")
      .lean();

    if (!property) return res.status(400).json({ msg: "Property not found" });

    // attach absolute URL
    property.propertyImg = property.propertyImg
      ? `${req.protocol}://${req.get("host")}${property.propertyImg}`
      : null;

    res.json(property);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function deleteProperty(req, res) {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) return res.status(400).json({ msg: "Property not found" });

    // delete image file from uploads
    if (property.propertyImg) {
      const imgPath = path.join(__dirname, "..", property.propertyImg);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    res.json({ msg: "Property deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

async function updateProperty(req, res) {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(400).json({ msg: "Property not found" });

    // restrict salesman
    if (
      req.user.role === "SALESMAN" &&
      property.createdBy.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ msg: "You can update only your own properties" });
    }

    // replace image
    if (req.file) {
      // delete old image
      if (property.propertyImg) {
        const oldPath = path.join(__dirname, "..", property.propertyImg);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      req.body.propertyImg = `/uploads/${req.file.filename}`;
    }

    const update = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ msg: "Property Updated", property: update });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

module.exports = {
  handleProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
};
