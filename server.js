const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors")
const authRouter = require("./routes/authRoutes")
const baseRouter = require("./routes/baseRoutes")
const assetRouter = require("./routes/assetRoutes")
const purchaseRouter = require("./routes/purchaseRoutes")
const transferRouter = require("./routes/transferRoutes")

// load enviorment variable
require("dotenv").config();

const app = express();

// connect mongodb database
connectDB();

// middleware
app.use(express.json())
app.use(cors({
    origin: 'https://military-asset-mangment.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

// routes
app.use("/api/user", authRouter)
app.use("/api/base", baseRouter)
app.use("/api/asset", assetRouter)
app.use("/api/order", purchaseRouter)
app.use("/api/transfer", transferRouter)


PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
})