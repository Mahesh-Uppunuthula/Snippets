const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
app.use(cors());

// CONSTANTS
const SERVER_PORT = process.env.SERVER_PORT;

app.get("/", (req, res)=>{
    res.send("helllo !")
})

app.get("/getData", (req, res)=>{
    res.send("data is send from server");
})

app.listen(5000, ()=>{console.log(`Server started on port ${SERVER_PORT}`);});
