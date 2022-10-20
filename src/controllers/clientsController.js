import { connection } from '../database.js'
import joi from 'joi'

const postClient = async (req, res) => {
    const { name, address, phone } = req.body;
    const clientsSchema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required().min(10).max(11)
    })
    const validation = clientsSchema.validate({ name, address, phone }, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error.details.map(error => error.message));
    }

    try {
        await connection.query('INSERT INTO clients (name,address,phone) VALUES ($1,$2,$3)', [name, address, phone]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export { postClient }