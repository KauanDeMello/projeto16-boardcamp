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

export async function createRental(req, res) {
  const { customerId, gameId, daysRented, rentDate, originalPrice } = req.rentalData;

  try {
    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES ($1, $2, $3, $4, $5)',
      [customerId, gameId, daysRented, rentDate, originalPrice]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
