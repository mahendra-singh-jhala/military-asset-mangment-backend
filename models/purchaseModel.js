const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    },

    quantity: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    assetbaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base'
    },

    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base'
    }

}, { timestamps: true })

const Purchase = mongoose.model("Purchase", purchaseSchema)

module.exports = Purchase