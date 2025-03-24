import db from "../db/index.js";
import { Character } from "../types.js";

export function fetchRandomCharacters(
  count: number,
  level: number
): Character[] {
  const stmt = db.prepare(`
    SELECT id, simplified, stroke_count, pinyin, radical, level
    FROM characters
    WHERE level = ?
    ORDER BY RANDOM()
    LIMIT ?
  `);

  const rows = stmt.all(level, count);
  return rows as Character[];
}
