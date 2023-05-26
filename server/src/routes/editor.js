const router = require("express").Router();

const editorController = require("../controllers/editorController");

router.post("/editor", editorController.saveSnippet);

module.exports = router;