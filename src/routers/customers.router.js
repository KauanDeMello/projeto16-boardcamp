import { Router } from "express";
import { findAllCustomers, CustomersById, createCustomers } from "../controllers/customers.controllers.js";
import validateCustomerSchema from "../middlewares/validateCPFschema.js"
import {customerSchema} from "../schemas/customers.schema.js"

const customersRouter = Router();

customersRouter.get("/customers", findAllCustomers);
customersRouter.get("/customers/:id", CustomersById);
customersRouter.post("/customers", validateCustomerSchema(customerSchema), createCustomers);


export default customersRouter;