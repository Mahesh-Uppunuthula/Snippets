const router = require("express").Router();
const auth = require("../middlware/auth");
const editorController = require("../controllers/editorController");

router.route("/")
    .get(auth,editorController.getAllSnippets)
    .post(auth,editorController.saveSnippet)

router.route("/:folderId/:snippetId")
    .get(auth,editorController.getSnippet)
    .put(auth, editorController.editSnippet)
    .delete(auth, editorController.deleteSnippet)

module.exports = router;