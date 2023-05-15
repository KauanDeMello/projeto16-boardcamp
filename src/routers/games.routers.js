import { Router } from "express";

import {findAllGames} from "../controllers/games.controllers.js"

const router = Router();

router.get("/games", findAllGames)

export default router;