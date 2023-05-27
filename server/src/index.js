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
const dashboardRoute = require("./routes/dashboard");
const editorRoute = require("./routes/editor");

app.get("/", (req, res)=>{
    res.send("helllo !")
})

app.use("/", userRoute);
app.use("/", dashboardRoute);
app.use("/editor", editorRoute);


app.get("/getData", (req, res)=>{
    res.json("this data is sent from server");
})


app.listen(5000, ()=>{console.log(`Server started on port ${SERVER_PORT}`);});
