const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base'
    },

    role: {
        type: String,
        enum: ['Admin', 'BaseCommander', 'LogisticsOfficer'],
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User