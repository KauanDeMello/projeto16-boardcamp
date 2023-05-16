import { Router } from "express";
import {findAllCustomers, CustomersById} from "../controllers/customers.controllers.js"

const customersRouter = Router();

customersRouter.get("/customers", findAllCustomers)
customersRouter.get("/customers/:id", CustomersById)

export default customersRouter;