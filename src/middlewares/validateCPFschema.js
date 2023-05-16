export default function validateCustomerSchema(schema) {
  return async (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    const { cpf } = req.body;

    try {
      const existingCustomer = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);

      if (existingCustomer.rowCount > 0) {
        return res.status(409).send({ message: 'Esse usuário já existe!' });
      }

      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}