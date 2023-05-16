import { Router } from "express";

import {findAllRents} from "../controllers/rentals.controllers.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", findAllRents)


export default rentalsRouter;