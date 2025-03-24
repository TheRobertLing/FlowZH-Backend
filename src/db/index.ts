import path from "path";
import Database from "better-sqlite3";

const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new Database(dbPath, { readonly: true });

db.pragma("journal_mode = WAL");

export default db;
