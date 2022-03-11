const express = require("express");
const { registerUser, signinUser, logout } = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(signinUser);
router.route("/logout").get(logout);

module.exports = router;