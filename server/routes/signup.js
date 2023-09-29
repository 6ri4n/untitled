const express = require("express");
const router = express.Router();

router.route("/").post(require("../controllers/signupUser"));

router.route("/username").post(require("../controllers/signupValidUsername"));

module.exports = router;
