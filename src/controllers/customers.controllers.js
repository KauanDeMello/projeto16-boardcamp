import {db} from "../database/db.js"

export async function findAllCustomers(req, res) {
    try{
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)
    } catch (err){
        res.status(500).send(err.message)
    }
}
export async function CustomersById(req, res) {
    const { id } = req.params
    try {
      const customer = await db.query('SELECT * FROM customers WHERE id=$1', [id])
  
      if (customer.rowCount === 0) return res.status(404).send({message: "Esse usuário não existe"})
  
      res.send(customer.rows[0])
    } catch (error) {
      res.status(500).send(error.message)
    }
  }


  export async function createCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await db.query(
            'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);',
            [name, phone, cpf, birthday])

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}