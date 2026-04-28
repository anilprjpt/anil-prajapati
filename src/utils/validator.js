// Generic validation helper
const validateRequiredFields = (data, fields) => {
  const missingFields = [];

  fields.forEach((field) => {
    if (
      data[field] === undefined ||
      data[field] === null ||
      data[field] === ""
    ) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }
};

// Specific validator for Employee
const validateEmployee = (data) => {
  validateRequiredFields(data, [
    "fullName",
    "jobTitle",
    "country",
    "salary"
  ]);

  // Additional checks
  if (typeof data.salary !== "number" || data.salary < 0) {
    throw new Error("Salary must be a positive number");
  }

  if (data.fullName.length < 2) {
    throw new Error("Full name must be at least 2 characters");
  }
};

module.exports = {
  validateEmployee
};