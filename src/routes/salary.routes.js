const express = require("express");
const router = express.Router();
const controller = require("../controllers/salary.controller");

router.get("/:id", controller.getSalary);
router.get("/metrics/country/:country", controller.getCountryMetrics);
router.get("/metrics/job/:jobTitle", controller.getJobMetrics);

module.exports = router;