import { Router } from "express";

import {findAllRents, createRental} from "../controllers/rentals.controllers.js"
import validateRental from "../middlewares/validateRentalSchema.js"
import {rentalSchema} from "../schemas/rentals.schema.js"
import validateSchemaCallBack from "../middlewares/validateSchemaCallback.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", findAllRents)
rentalsRouter.post("/rentals", validateSchemaCallBack(rentalSchema) ,validateRental,createRental)


export default rentalsRouter;