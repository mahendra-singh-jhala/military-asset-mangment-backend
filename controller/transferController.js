const Base = require("../models/baseModel");
const Transfer = require("../models/transferModel")

exports.transferAsset = async (req, res) => {
    const { baseId, toBaseId, purchaseId, date } = req.body
    try {
        const newTransferAsset = new Transfer({
            fromBase: baseId,
            toBase: toBaseId,
            purchase: purchaseId,
            date
        })

        await newTransferAsset.save();
        await Base.findByIdAndUpdate(baseId, {
            $push: { transfer: newTransferAsset._id }
        })

        res.status(200).json({
            message: "Transfer asset successfully",
            newTransferAsset
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to transfer Asset",
            error: error.message
        })
    }
}