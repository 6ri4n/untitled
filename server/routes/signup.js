const express = require("express");
const router = express.Router();

router.route("/").post(require("../controllers/signupUser"));

module.exports = router;
