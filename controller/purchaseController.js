const Base = require("../models/baseModel");
const Purchase = require("../models/purchaseModel");

exports.createOrder = async (req, res) => {
    const { asset, quantity, date, assetbaseId, baseId } = req.body
    try {
        const newOrder = new Purchase({
            asset,
            quantity,
            date,
            assetbaseId,
            baseId
        })

        await newOrder.save();

        await Base.findByIdAndUpdate(baseId, {
            $push: { purchases: newOrder._id }
        })

        res.status(200).json({
            message: "Purchase successfully",
            newOrder
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to create Order",
            error: error.message
        })
    }
}