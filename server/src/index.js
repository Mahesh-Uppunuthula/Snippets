const express = require("express");
const app = express();
const cors = require("cors");

// ENVIRONMENT VARIABLES CONFIG
require("dotenv").config();

app.use(express.json());
app.use(cors());

// DATABASE CONFIG
require("./connect");

// CONSTANTS
const SERVER_PORT = process.env.PORT;

// ROUTES
const userRoute = require("./routes/users");
const dashboardRoute = require("./routes/dashboard");
const editorRoute = require("./routes/editor");


app.use("/", userRoute);
app.use("/dashboard", dashboardRoute);
app.use("/editor", editorRoute);

app.get("/getData", (req, res) => {
  res.json("this data is sent from server");
});

console.log(SERVER_PORT);

app.listen(SERVER_PORT || 5000, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
