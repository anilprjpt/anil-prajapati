const express = require("express");
const app = express();

const employeeRoutes = require("./routes/employee.routes");
const salaryRoutes = require("./routes/salary.routes");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/salary", salaryRoutes);

app.use(errorMiddleware);

module.exports = app;