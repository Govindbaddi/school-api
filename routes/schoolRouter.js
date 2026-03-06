const express = require("express");
const { addSchool, listSchools } = require("../controllers/schoolController");
const router = express.Router();
//const schoolController = require("../controllers/schoolController");

router.post("/addSchool", addSchool);
router.get("/listSchools",listSchools);

module.exports = router;