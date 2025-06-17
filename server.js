const express = require("express");
const connectDB = require("./config/db")

// load enviorment variable
require("dotenv").config();

const app = express();

// connect mongodb database
connectDB();


PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
})