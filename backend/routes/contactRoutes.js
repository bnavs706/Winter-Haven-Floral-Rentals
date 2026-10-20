const express = require("express");
// express import
const { submitContact } = require("../controllers/contactController");
// import submitConact controller
const router = express.Router();

router.post("/contact", submitContact);

module.exports = router;