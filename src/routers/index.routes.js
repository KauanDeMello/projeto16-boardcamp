import { Router } from "express"
import gamesRouter from "./games.routers.js"
import customersRouter from "./customers.router.js"
import rentalsRouter from "./rentals.router.js"

const router = Router()
router.use(customersRouter)
router.use(gamesRouter)
router.use(rentalsRouter)

export default router
