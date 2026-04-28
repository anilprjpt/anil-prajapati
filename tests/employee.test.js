const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/database");

beforeAll(() => {
  db.prepare("DELETE FROM employees").run();
});

describe("Employee API - CRUD", () => {
  let employeeId;

  const employeePayload = {
    fullName: "Anil Prajapati",
    jobTitle: "Software Engineer",
    country: "India",
    salary: 50000,
  };

  // CREATE
  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send(employeePayload);

    expect(res.statusCode).toBe(201);
    employeeId = res.body.id;
  });

  it("should fail if required fields are missing", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "Anil",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Missing required fields");
  });

  it("should fail if salary is negative", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "Anil",
      jobTitle: "Dev",
      country: "India",
      salary: -100,
    });

    expect(res.statusCode).toBe(400);
  });

  it("should fail if fullName is too short", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "A",
      jobTitle: "Dev",
      country: "India",
      salary: 1000,
    });

    expect(res.statusCode).toBe(400);
  });

  // READ ALL
  it("should get all employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.statusCode).toBe(200);
  });

  // READ BY ID
  it("should get employee by id", async () => {
    const res = await request(app).get(`/employees/${employeeId}`);
    expect(res.statusCode).toBe(200);
  });

  // UPDATE
  it("should update employee", async () => {
    const res = await request(app).put(`/employees/${employeeId}`).send({
      fullName: "Updated Name",
      jobTitle: "Senior Developer",
      country: "India",
      salary: 70000,
    });

    expect(res.statusCode).toBe(200);
  });

  // DELETE
  it("should delete employee", async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);
    expect(res.statusCode).toBe(204);
  });

  it("should return error for non-existing employee", async () => {
    const res = await request(app).get(`/employees/${employeeId}`);
    expect(res.statusCode).toBe(400);
  });
});
