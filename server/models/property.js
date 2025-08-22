const { Schema, model, Types,mongoose } = require('mongoose');

const propertySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
 discription: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  propertyImg: {
    type: String,
    // required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",          
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Property", propertySchema);
