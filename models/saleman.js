const {Schema, model} = require("mongoose");

const salemanSchema = new Schema({
    fullName:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required: true,
        unquie: true
    },
    phone:{
        phone: String,
        createdBy:{
            type: Date,
            default: Date.now
        }
    }
})

const Salesman = model("Salesman", salemanSchema);
module.exports = Salesman;