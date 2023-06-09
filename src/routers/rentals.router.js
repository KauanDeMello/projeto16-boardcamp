import { Router } from "express";

import {findAllRents, createRental, finishRental, deleteRental} from "../controllers/rentals.controllers.js"
import validateRental from "../middlewares/validateRentalSchema.js"
import {rentalSchema} from "../schemas/rentals.schema.js"
import validateSchemaCallBack from "../middlewares/validateSchemaCallback.js"
import validateReturn from "../middlewares/validateRentalSchema.js"
import validateDeleteRental from "../middlewares/validateRentalSchema.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", findAllRents)
rentalsRouter.post("/rentals", validateSchemaCallBack(rentalSchema) ,validateRental,createRental)
rentalsRouter.post("/rentals:id/return", validateSchemaCallBack(rentalSchema) ,validateReturn,finishRental)
rentalsRouter.delete("/rentals/:id", validateDeleteRental, deleteRental)



export default rentalsRouter;