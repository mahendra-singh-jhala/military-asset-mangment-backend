const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors")
const authRouter = require("./routes/authRoutes")

// load enviorment variable
require("dotenv").config();

const app = express();

// connect mongodb database
connectDB();

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

// routes
app.use("/api/user", authRouter)



PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
})