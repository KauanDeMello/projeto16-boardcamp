import {db} from "../database/db.js"

export async function findAllCustomers(req, res) {
    try{
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)
    } catch (err){
        res.status(500).send(err.message)
    }
}