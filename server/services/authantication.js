const jwt = require("jsonwebtoken");

function createToken(user) {
    const payload={
        _id:user._id, 
        name: user.fullName,
        role:user.role
    }
    const token = jwt.sign(
       payload,
        process.env.JWT_SECRET
    )
    return token;
}
module.exports = {
    createToken,
};