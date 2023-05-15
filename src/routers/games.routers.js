import { Router } from "express";

import {findAllGames, createGames} from "../controllers/games.controllers.js"
import validateGameSchema from "../middlewares/validateSchema.js"
import {createGameSchema} from "../schemas/games.schema.js"

const router = Router();

router.get("/games", findAllGames)
router.post("/games", validateGameSchema(createGameSchema), createGames)

export default router;