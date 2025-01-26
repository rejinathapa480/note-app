const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    }
});

userSchema.methods.doesPassMatch = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const slat =await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, slat)
    }
    next()
})
module.exports = mongoose.model("User", userSchema);