const mongoose = require("mongoose")

const transferSchema = new mongoose.Schema({
    fromBase: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Base'
    },

    toBase: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Base'
    },

    purchase: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Purchase'
    },
    
    date: { 
        type: Date, 
        default: Date.now 
    }

}, { timestamps: true })

const Transfer = mongoose.model("Transfer", transferSchema)

module.exports = Transfer