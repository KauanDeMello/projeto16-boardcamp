import { Router } from "express";
import {findAllCustomers} from "../controllers/customers.controllers.js"

const customersRouter = Router();

customersRouter.get("/customers", findAllCustomers)

export default customersRouter;