import { connection } from '../database.js'


const postCakes = async (req, res) => {
    const { name, price, image, description } = res.locals.body

    try {
        await connection.query('INSERT INTO cakes (name,price,image,description) VALUES ($1,$2,$3,$4)', [name, price, image, description]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export { postCakes }