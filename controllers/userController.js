const User = require("../models/user");

async function getUser(req ,res) {
    try {
        const users = await User.find().select("-password");
        res.jason(users);
    } catch (error) {
        res.status(500).jason({msg:"Server Error"});
    } 
}

async function getUserById(req ,res) {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(403).jason("User is not Found")
        res.jason(user)
        
    } catch (error) {
        res.status(500).jason({msg:"Server Error"})
    }
    
}

async function deleteUser(req ,res) {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
         if (!user) return res.status(403).jason("User is not Found")
        res.jason({msg:"User Deleted Successfully"})

    } catch (error) {
        res.status(500).jason({msg:"Server Error"})
    }   
}

module.exports = {
    getUser,
    getUserById,
    deleteUser
}