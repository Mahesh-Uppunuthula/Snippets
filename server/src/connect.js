const mongoose = require("mongoose");
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB_NAME = "snippets";
mongoose.connect("mongodb+srv://mahesh-admin:mahesh312@snippets.fvq07ka.mongodb.net/snippets?retryWrites=true&w=majority");
