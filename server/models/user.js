const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        trim : true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type: String,
        enum: ["ADMIN","USER","SALESMAN"],
        default: "USER"
    }
},{timestamps:true})

const User = model("User", userSchema);
module.exports = User;
