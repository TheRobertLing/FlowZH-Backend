import { Request, Response } from "express";
import { Character } from "../types.js";
import { fetchRandomCharacters } from "../models/CharacterModel.js";

export const getCharactersV1 = (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const count: number = req.query.count
      ? parseInt(req.query.count as string)
      : 10;
    const preset: number = req.query.preset
      ? parseInt(req.query.preset as string)
      : 1;
    
    // Fetch data
    const data: Character[] = fetchRandomCharacters(count, preset)
    res.json(data);
  } catch (err) {
    console.error("Error fetching characters:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}