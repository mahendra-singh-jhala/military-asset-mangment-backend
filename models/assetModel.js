const mongoose = require("mongoose")

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base'
    }
}, { timestamps: true })

const Asset = mongoose.model("Asset", assetSchema)

module.exports = Asset