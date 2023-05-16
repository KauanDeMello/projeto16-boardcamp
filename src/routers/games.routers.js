import { Router } from "express";

import {findAllGames, createGames} from "../controllers/games.controllers.js"
import validateGameSchema from "../middlewares/validateSchema.js"
import {createGameSchema} from "../schemas/games.schema.js"

const gamesRouter = Router();

gamesRouter.get("/games", findAllGames)
gamesRouter.post("/games", validateGameSchema(createGameSchema), createGames)

export default gamesRouter;