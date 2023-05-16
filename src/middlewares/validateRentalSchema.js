import {db} from "../database/db.js"


export default async function validateRental(schema) {
    return async function (req, res, next) {
      const { customerId, gameId, daysRented } = req.body;
  
      try {
        const { error } = schema.validate(req.body);
        if (error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
  
        const existingCustomer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        if (existingCustomer.rowCount === 0) {
          return res.status(400).send('O customerId não é válido.');
        }
  
        const existingGame = await db.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (existingGame.rowCount === 0) {
          return res.status(400).send('O gameId não é válido.');
        }
  
        const rentedGames = await db.query(
          'SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL',
          [gameId]
        );
        const game = existingGame.rows[0];
        if (rentedGames.rows[0].count >= game.stockTotal) {
          return res.status(400).send('Não há jogos disponíveis para aluguel.');
        }
  
        const rentDate = dayjs().format('YYYY-MM-DD');
        const originalPrice = daysRented * game.pricePerDay;
  
        req.rentalData = {
          customerId,
          gameId,
          daysRented,
          rentDate,
          originalPrice,
          returnDate: null,
          delayFee: null,
        };
  
        next();
      } catch (err) {
        res.status(500).send(err.message);
      }
    };
  }