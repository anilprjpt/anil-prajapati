const express = require("express");
const router = express.Router();
const controller = require("../controllers/employee.controller");

router.post("/", controller.createEmployee);
router.get("/", controller.getEmployees);
router.get("/:id", controller.getEmployee);

module.exports = router;