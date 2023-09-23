const express = require("express");
const router = express.Router();

router.route("/").post(require("../controllers/loginUser"));

module.exports = router;
