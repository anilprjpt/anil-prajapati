const db = require("../config/database");

exports.calculateSalary = (employee) => {
  let deduction = 0;

  if (employee.country === "India") {
    deduction = employee.salary * 0.1;
  } else if (employee.country === "United States") {
    deduction = employee.salary * 0.12;
  }

  return {
    gross: employee.salary,
    deduction,
    net: employee.salary - deduction
  };
};
