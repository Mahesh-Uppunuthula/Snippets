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
const SERVER_PORT = process.env.PORT || 5000;

// ROUTES
const userRoute = require("./routes/users");
const dashboardRoute = require("./routes/dashboard");
const editorRoute = require("./routes/editor");
const extensionRoute = require("./routes/extension");


app.use("/", userRoute);
app.use("/dashboard", dashboardRoute);
app.use("/editor", editorRoute);
app.use("/extension",extensionRoute);

app.get("/getData", (req, res) => {
  res.json("this data is sent from server");
});

console.log(SERVER_PORT);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
