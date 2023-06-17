const router  = require("express").Router();
const auth = require("../middlware/auth");
const extensionController = require("../controllers/extensionController");

router
    .route("/")
    .get(auth, extensionController.getFavFolder)

module.exports = router;