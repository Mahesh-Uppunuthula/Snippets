const mongoose = require("mongoose");
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB_NAME = "snippets";
mongoose.connect(process.env.MONGO_URL);
