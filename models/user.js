const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["ADMIN","USER","SALESMAN"],
        default: "USER"
    }
},{timestamps:true})

const User = model("User", userSchema);
module.exports = User;
