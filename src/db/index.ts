import Database from "better-sqlite3";

// Create a new database connection
const db = new Database("database.sqlite");

db.pragma("journal_mode = WAL");

export default db;