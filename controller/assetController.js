const Asset = require("../models/assetModel")
const Base = require("../models/baseModel")

exports.createAsset = async (req, res) => {
    const { name, category, price, baseId } = req.body
    try {
        const newAsset = new Asset({
            name,
            category,
            price,
            base: baseId
        })

        await newAsset.save()

        await Base.findByIdAndUpdate(baseId, {
            $push: { asset: newAsset._id }
        });

        res.status(200).json({
            message: "Asset Create Successfully",
            newAsset
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to Creating Asset",
            error: error.message
        })
    }
}
