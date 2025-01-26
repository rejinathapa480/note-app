const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.db);
    } catch (error) {
        console.log("Db connection failed", error);
    }
}

module.exports = connectDb;