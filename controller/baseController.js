const Base = require("../models/baseModel")

exports.createBase = async (req, res) => {
    const { name, location, openingBalance, closingBalance } = req.body
    try {
        const newBase = new Base({
            name,
            location,
            openingBalance,
            closingBalance
        })

        await newBase.save()
        res.status(200).json({
            message: "Base Create Successfully",
            newBase
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to Creating base",
            error: error.message
        })
    }
}

exports.getBase = async (req, res) => {
    try {
        const bases = await Base.find()
            .populate("user")
            .populate("asset")
            .populate({ path: "purchases", populate: { path: "asset" }})
            .populate({ path: "transfer", populate: [{ path: "toBase" }, { path: "fromBase" }, { path: "purchase" }] })
        res.status(200).json({
            message: "Bases fetch Successfully",
            bases
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch all bases",
            error: error.message
        })
    }
}

exports.getBaseById = async (req, res) => {
    const BaseId = req.params.id
    try {
        const base = await Base.findById({ _id: BaseId })
            .populate("user")
            .populate("asset")
            .populate({ path: "purchases", populate: { path: "asset" }})
            .populate({ path: "transfer", populate: [{ path: "toBase" }, { path: "fromBase" }, { path: "purchase" }] })
        if(!base) {
            return res.status(400).json({
                message: "base Not Found"
            })
        }

        res.status(200).json({
            message: "Base fetch Successfully",
            base
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch base by Id",
            error: error.message
        })
    }
}