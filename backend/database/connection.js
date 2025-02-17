const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to the database");
    } catch (error) {
    console.error("Error connecting to the database:", error);
    console.log(process.env.MONGODB_URL);
    process.exit(1);
    }
};

module.exports = connectDB;
