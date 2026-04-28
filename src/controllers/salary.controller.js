const employeeRepo = require("../repositories/employee.repository");
const salaryService = require("../services/salary.service");

exports.getSalary = (req, res, next) => {
  try {
    const employee = employeeRepo.findById(req.params.id);
    if (!employee) throw new Error("Employee not found");

    res.json(salaryService.calculateSalary(employee));
  } catch (err) {
    next(err);
  }
};
