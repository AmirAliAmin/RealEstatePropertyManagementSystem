const Salesman = require("../models/saleman");
const bcrypt = require("bcryptjs");

async function createSaleman(req, res) {
  try {
    const { fullName, email, phone, password } = req.body;

    //check if email/phone exists
    const exists = await Salesman.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(400).json({
        msg:
          exists.email === email
            ? "Email already exists"
            : "Phone number already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const salesman = new Salesman({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    await salesman.save();
    const { password: _, ...salesmanData } = salesman.toObject();
    res
      .status(201)
      .json({ msg: "Salesman created successfully", salesman: salesmanData });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ msg: `${field} already exists` });
    }
    res.status(500).json({ msg: "Server Error" });
  }
}

async function getAllSaleman(req, res) {
  try {
    const salesman = await Salesman.find().select("-password");
    res.json(salesman);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}
async function getSalemanById(req, res) {
  try {
    const { id } = req.params;
    const salesman = await Salesman.findById(id).select("-password");
    if (!salesman) return res.status(404).json({ msg: "Salesman not found" });
    res.json(salesman);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function updateSaleman(req, res) {
  try {
    const { id } = req.params;
    const salesman = await Salesman.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if (!salesman) return res.status(404).json({ msg: "Salesman not found" });
    res.json(salesman);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function deleteSaleman(req, res) {
  try {
    const { id } = req.params;
    const salesman = await Salesman.findByIdAndDelete(id).select("-password");
    if (!salesman) return res.status(404).json({ msg: "Salesman not found" });
    res.json(salesman);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
}

module.exports = {
  createSaleman,
  getAllSaleman,
  getSalemanById,
  updateSaleman,
  deleteSaleman,
};
