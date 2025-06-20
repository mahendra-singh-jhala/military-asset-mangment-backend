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

exports.getOrderById = async (req, res) => {
    const baseId = req.params.id
    try {
        const order = await Purchase.find({ assetbaseId: baseId })
            .populate("asset")
            .populate("assetbaseId")
            .populate("baseId")
        
        res.status(200).json({
            message: "Order fetch successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch Order",
            error: error.message
        })
    }
}