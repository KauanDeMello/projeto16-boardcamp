import { db } from "../database/db.js";

export async function findAllRents(req, res) {
  try {
    const { rows: rentals } = await db.query(`
      SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id;
    `);

    const result = rentals.map((rental) => {
      const { customerId, gameId, customerName, gameName, ...rest } = rental;

      return {
        ...rest,
        customer: { id: customerId, name: customerName },
        game: { id: gameId, name: gameName },
      };
    });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}