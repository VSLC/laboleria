import { connection } from '../database.js'
import joi from 'joi'
import dayjs from 'dayjs'

const postOrder = async (req, res) => {
    const { clientId, cakeId, quantity } = req.body;

    const orderSchema = joi.object({
        clientId: joi.number().integer().required(),
        cakeId: joi.number().integer().required(),
        quantity: joi.number().integer().min(1).max(4).required(),
    })

    const validation = orderSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(400).send(validation.error.details.map(error => error.message))
    }

    const findClientById = await connection.query('SELECT * FROM clients WHERE id=$1', [clientId]);
    const findCakeById = await connection.query('SELECT * FROM cakes WHERE id=$1', [cakeId]);
    console.log(findCakeById);


    if (findClientById.rowCount === 0) {
        return res.status(404).send("Usuário não encontrado.");
    }

    if (findCakeById.rowCount === 0) {
        return res.status(404).send("Bolo não encontrado.");
    }

    let totalPrice = findCakeById.rows[0].price * quantity;
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

    try {
        const insertOrder = await connection.query(`INSERT INTO orders ("clientId","cakeId",quantity,"totalPrice","createdAt") 
        VALUES ($1,$2,$3,$4,$5)`, [clientId, cakeId, quantity, totalPrice, createdAt]);
        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { postOrder }