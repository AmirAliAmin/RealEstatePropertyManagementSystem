const {Schema ,model} = require("mongoose");


const inquirySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    propertyId:{
        type: Schema.Types.ObjectId,
        ref:"Property",
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps: true});


module.exports = model("Inquiry", inquirySchema);