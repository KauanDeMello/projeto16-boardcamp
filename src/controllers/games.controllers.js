import {db} from "../database/db.js"

export async function findAllGames(req, res) {
    try{
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games.rows)
    } catch (err){
        res.status(500).send(err.message)
    }
}


export async function createGames (req,res) {
    const {name, image, stockTotal, pricePerDay} = res.body

    try{
        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay ])
    } catch (err){
        res.status(500).send(err.message)
    }

}
