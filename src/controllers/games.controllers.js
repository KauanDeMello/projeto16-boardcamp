import {db} from "../database/db.js"

export async function findAllGames(req, res) {
    try{
        const games = await db.query('SELECT * FROM games;')
        res.send(receitas)
    } catch (err){
        console.log(err.message)
    }
}