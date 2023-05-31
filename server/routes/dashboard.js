const router = require("express").Router();
const auth = require("../middlware/auth");

const dashboardController = require("../controllers/dashboardController");

router
  .route("/")
  .get(auth, dashboardController.getAllFolders)
  .post(auth, dashboardController.createFolder);

router
  .route("/:folderId")
  .get(auth, dashboardController.getAllSnippetsOfAFolder)
  .delete(auth, dashboardController.deleteFolder);

module.exports = router;
