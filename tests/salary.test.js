const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/database");

describe("Salary API", () => {
  let indiaEmpId;
  let usEmpId;
  let otherEmpId;

  beforeAll(async () => {
    db.prepare("DELETE FROM employees").run();

    const insert = db.prepare(`
      INSERT INTO employees (fullName, jobTitle, country, salary)
      VALUES (?, ?, ?, ?)
    `);

    indiaEmpId = insert.run("Emp India", "Dev", "India", 1000).lastInsertRowid;
    usEmpId = insert.run("Emp US", "Dev", "United States", 1000).lastInsertRowid;
    otherEmpId = insert.run("Emp Other", "Dev", "UAE", 1000).lastInsertRowid;
  });

  // INDIA
  it("should calculate salary for India (10% deduction)", async () => {
    const res = await request(app).get(`/salary/${indiaEmpId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.gross).toBe(1000);
    expect(res.body.deduction).toBe(100);
    expect(res.body.net).toBe(900);
  });

  // US
  it("should calculate salary for US (12% deduction)", async () => {
    const res = await request(app).get(`/salary/${usEmpId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.deduction).toBe(120);
    expect(res.body.net).toBe(880);
  });

  // OTHER
  it("should calculate salary for other countries (no deduction)", async () => {
    const res = await request(app).get(`/salary/${otherEmpId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.deduction).toBe(0);
    expect(res.body.net).toBe(1000);
  });
  
  it("should return error for invalid employee id", async () => {
    const res = await request(app).get("/salary/9999");

    expect(res.statusCode).toBe(400);
  });
});