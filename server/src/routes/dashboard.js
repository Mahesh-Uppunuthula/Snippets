const router = require("express").Router();

const dashboardController = require("../controllers/dashboardController");

router.post("/dashboard", dashboardController.getUserDirectory)

module.exports = router;