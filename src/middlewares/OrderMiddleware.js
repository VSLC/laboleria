import joi from 'joi'
import { connection } from '../database.js'

const orderMiddleware = async (req, res, next) => {
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


    if (findClientById.rowCount === 0) {
        return res.status(404).send("Usuário não encontrado.");
    }

    if (findCakeById.rowCount === 0) {
        return res.status(404).send("Bolo não encontrado.");
    }

    res.locals.body = req.body;

    next()
}

export { orderMiddleware }