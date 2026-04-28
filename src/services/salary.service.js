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

exports.getCountryMetrics = (country) => {
  return db.prepare(`
    SELECT 
      MIN(salary) as min,
      MAX(salary) as max,
      AVG(salary) as avg
    FROM employees
    WHERE country = ?
  `).get(country);
};

exports.getJobTitleAvg = (jobTitle) => {
  return db.prepare(`
    SELECT AVG(salary) as avg
    FROM employees
    WHERE jobTitle = ?
  `).get(jobTitle);
};
