const {Schema,model} = require('mongoose');
const User = require('./user');

const propertySchema = new Schema({
    title : String,
    discription: String,
    price: Number,
    location: String,
    propertyImg: String,
    createdBy: {type:Schema.Types.ObjectId, ref:User},
    createdAt: {type: Date, default:Date.now}
})

module.exports = model("Property", propertySchema);