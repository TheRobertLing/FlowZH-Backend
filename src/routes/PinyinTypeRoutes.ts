import { Router } from "express";
import { getCharacters } from "../controllers/PinyinTypeController.js";

const router = Router();

router.get("/characters", getCharacters);

export default router;