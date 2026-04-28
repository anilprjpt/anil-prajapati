const repo = require("../repositories/employee.repository");
const { validateEmployee } = require("../utils/validator");

exports.createEmployee = (data) => {
  validateEmployee(data); 
  return repo.create(data);
};

exports.getAllEmployees = () => {
  return repo.findAll();
};

exports.getEmployeeById = (id) => {
  const employee = repo.findById(id);
  if (!employee) throw new Error("Employee not found");
  return employee;
};
