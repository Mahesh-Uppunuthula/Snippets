const express = require("express");
const app = express();
const cors = require("cors");

// DATABASE CONFIG
require("./connect");

// ENVIRONMENT VARIABLES CONFIG
require('dotenv').config()

app.use(express.json());
app.use(cors());

// CONSTANTS
const SERVER_PORT = process.env.SERVER_PORT;

// ROUTES
const userRoute = require("./routes/users");

app.get("/", (req, res)=>{
    res.send("helllo !")
})

app.use("/auth", userRoute);

app.get("/getData", (req, res)=>{
    res.send("data is send from server");
})


app.listen(5000, ()=>{console.log(`Server started on port ${SERVER_PORT}`);});
