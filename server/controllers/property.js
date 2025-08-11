const Property = require("../models/property");

async function handleProperty(req, res) {
  try {
    const { title, discription, price, location } = req.body;
    const property = new Property({
      title,
      discription,
      price,
      location,
      propertyImg: req.file.filename,
      createdBy: req.user._id,
    });
    await property.save();
    res.status(201).json({ msg: "property created", property });
  } catch (error) {
    console.log(error);
    console.log("Uploaded file info:", req.file);
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

    //pagination
    const skip = (Number(page) - 1) * Number(limit);
    const properties = await Property.find(query)
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function getPropertyById(req, res) {
  try {
    const property = await Property.findById(req.params.id).populate(
      "createdBy",
      "fullName email"
    );
    if (!property) return res.status(400).json({ msg: "property not found" });
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
    res.json(property);
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

    //restrict saleman to only
    if (
      req.user.role === "SALESMAN" &&
      property.createdBy.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ msg: "You can update only your own properties" });
    }

    if (req.file) {
      req.body.propertyImg = req.file.filename;
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
  getPropertyById,
  deleteProperty,
  getAllProperties,
  updateProperty,
};
