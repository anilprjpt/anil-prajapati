const service = require("../services/employee.service");

exports.createEmployee = (req, res, next) => {
  try {
    const data = service.createEmployee(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = (req, res, next) => {
  try {
    res.json(service.getAllEmployees());
  } catch (err) {
    next(err);
  }
};

exports.getEmployee = (req, res, next) => {
  try {
    res.json(service.getEmployeeById(req.params.id));
  } catch (err) {
    next(err);
  }
};
