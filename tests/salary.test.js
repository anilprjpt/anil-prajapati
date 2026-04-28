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

describe("Salary Metrics API", () => {
  beforeAll(() => {
    db.prepare("DELETE FROM employees").run();

    const insert = db.prepare(`
      INSERT INTO employees (fullName, jobTitle, country, salary)
      VALUES (?, ?, ?, ?)
    `);

    insert.run("A", "Developer", "India", 1000);
    insert.run("B", "Developer", "India", 2000);
    insert.run("C", "Manager", "India", 3000);
    insert.run("D", "Developer", "USA", 4000);
  });

  // COUNTRY METRICS
  it("should return min, max, avg salary by country", async () => {
    const res = await request(app).get("/salary/metrics/country/India");

    expect(res.statusCode).toBe(200);
    expect(res.body.min).toBe(1000);
    expect(res.body.max).toBe(3000);
    expect(Math.round(res.body.avg)).toBe(2000);
  });

  // JOB TITLE AVG
  it("should return average salary by job title", async () => {
    const res = await request(app).get("/salary/metrics/job/Developer");

    expect(res.statusCode).toBe(200);
    expect(Math.round(res.body.avg)).toBe(2333);
  });
  
  it("should handle no employees in country", async () => {
    const res = await request(app).get("/salary/metrics/country/Japan");

    expect(res.statusCode).toBe(200);
    expect(res.body.min).toBe(null);
  });
});