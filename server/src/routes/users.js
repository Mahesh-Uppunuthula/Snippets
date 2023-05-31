const router = require("express").Router();

const userController = require('../controllers/userController');

router.route("/", userController.justHomeRoute)

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/verify", userController.verifiedUser);

module.exports = router;