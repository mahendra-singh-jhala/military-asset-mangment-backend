const mongoose = require("mongoose")

// load enviorment variable
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Database connected Successfully")
    } catch (error) {
        console.log("Error to connect MongoDB Database")
    }
}

module.exports = connectDB