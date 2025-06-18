const mongoose = require("mongoose")

const baseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    openingBalance: { 
        type: Number, 
        default: 10000000
    },

    closingBalance: { 
        type: Number, 
        default: 10000000
    },

    netMovement: {
        type: Number,
        default: 0
    },

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    asset: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Asset' 
    }],

    purchases: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Purchase' 
    }],

    transfer: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transfer' 
    }]
}, { timestamps: true })

const Base = mongoose.model("Base", baseSchema)

module.exports = Base