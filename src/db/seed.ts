// import db from "./index.ts"; For ts-node to work
import db from "./index.js";
import csv from "csv-parser";
import * as fs from "fs";
import path from "path";

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY,
    simplified TEXT,
    stroke_count INTEGER,
    pinyin TEXT,
    radical TEXT,
    level INTEGER
  );
`;

db.exec(createTableQuery);

const results: {
  Position: string;
  Simplified: string;
  "Stroke Count": string;
  Pinyin: string;
  Radical: string;
  Level: string;
}[] = [];

const csvPath = path.resolve("src/data/SimplifiedDataCSV.csv");

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row) => {
    results.push(row);
  })
  .on("end", () => {
    console.log(`Parsed ${results.length} rows`);

    const insertQuery = `
        INSERT INTO characters (id, simplified, stroke_count, pinyin, radical, level)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const stmt = db.prepare(insertQuery);

    for (const row of results) {
      stmt.run([
        parseInt(row.Position),
        row.Simplified,
        parseInt(row["Stroke Count"]),
        row.Pinyin,
        row.Radical,
        parseInt(row.Level),
      ]);
    }

    console.log("Data inserted");
  });
