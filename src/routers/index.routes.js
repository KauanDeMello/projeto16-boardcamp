import { Router } from "express"
import gamesRouter from "./games.routers.js"
import customersRouter from "./customers.router.js"

const router = Router()
router.use(customersRouter)
router.use(gamesRouter)

export default router
