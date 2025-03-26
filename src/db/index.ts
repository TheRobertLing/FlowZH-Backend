import path, { dirname } from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Point to ../data/database.sqlite
const dbPath = path.resolve(__dirname, "../../data/database.sqlite");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

export default db;
