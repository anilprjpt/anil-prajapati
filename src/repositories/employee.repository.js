const db = require("../config/database");

exports.create = (employee) => {
  const stmt = db.prepare(`
    INSERT INTO employees (fullName, jobTitle, country, salary)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    employee.fullName,
    employee.jobTitle,
    employee.country,
    employee.salary
  );

  return { id: result.lastInsertRowid, ...employee };
};

exports.findAll = () => {
  return db.prepare("SELECT * FROM employees").all();
};

exports.findById = (id) => {
  return db.prepare("SELECT * FROM employees WHERE id=?").get(id);
};
