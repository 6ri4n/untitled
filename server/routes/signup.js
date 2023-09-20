const express = require("express");
const router = express.Router();

router.route("/").post(require("../controllers/signup"));

module.exports = router;
