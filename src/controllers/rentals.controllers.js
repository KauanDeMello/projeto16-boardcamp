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

export async function finishRental(req, res) {
  const { id } = req.params;
  const { pricePerDay, daysRented, rentDate } = res.locals;
  let delayFee = null;

  const difference = dayjs().diff(dayjs(rentDate), 'days');

  if (difference > daysRented) {
    delayFee = pricePerDay * (difference - daysRented);
  }

  try {
    await db.query(
      `
      UPDATE rentals
      SET "returnDate" = $1, "delayFee" = $2
      WHERE id = $3;
    `,
      [dayjs().format('YYYY-MM-DD'), delayFee, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params
  try {
      await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
      res.sendStatus(200)
  } catch (err) {
      res.status(500).send(err.message)
  }
} 