const { Schema, model } = require("mongoose");

const salemanSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
},
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Salesman = model("Salesman", salemanSchema);
module.exports = Salesman;
