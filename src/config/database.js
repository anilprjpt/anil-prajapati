const Database = require("better-sqlite3");

const db = new Database("salary.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    jobTitle TEXT NOT NULL,
    country TEXT NOT NULL,
    salary REAL NOT NULL
)
`).run();

module.exports = db;