import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const {Pool} = pg;

const configDatabase = {
    connnectionString: process.env.DATABSE_URL,
}

export const db = new Pool(configDatabase)


